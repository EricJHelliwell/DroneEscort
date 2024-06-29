
import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { parseISO } from 'date-fns';
import { isDroneAssigned } from '../library/order'
import { getUser, getUserProfilePhoto } from '../library/user';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { uploadData, getUrl } from "aws-amplify/storage";
import { StatusBar, Style } from '@capacitor/status-bar';

const client = generateClient<Schema>();

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  @ViewChild('content') private content: any;

  chatName = "";
  messages: any[] = [];
  drones: any[] = [];
  userMe: any;
  userMePhoto: any;
  userOther: any;
  userOtherPhoto: any;
  isDroneModalOpen = false;  
  isAttachModalOpen = false;
  conversationId = "";
  convSub = null;

  constructor(public router: Router, private activatedRoute: ActivatedRoute,
    private navCtrl: NavController, private authService: AuthGuardService,
    private alertCtl: AlertController, private zone: NgZone) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('conversationId')) {
        // redirect
        this.router.navigate(['/tabs/chat']);
        return;
      }
      this.conversationId = paramMap.get('conversationId');
    }); 
  }

  ionViewDidEnter() {
    this.userMe = this.authService.userDatabase();
    getUserProfilePhoto(this.userMe.id, (url) => {
      this.userMePhoto = url;
    });
    this.loadMessage(this.conversationId);
  }

  ionViewDidLeave() {
    if (this.convSub) {
      this.convSub.unsubscribe();
    }
  }

  async pushMessageType(msg: any)  {
    // ensure msg is unique
    const findMsg = this.messages.find((id) => msg.id == id);
    if (findMsg)
      return;

    if (!msg.isText) {
      const URL = await getUrl({path: msg.content});
      msg.content = URL.url.toString();
    }
    this.messages.push(msg);
    this.messages = this.messages.sort(function(a, b) {
      return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
    });
  }

  async loadMessage(conversationId) {
    // await StatusBar.hide();

    const {errors, data: conv } = await client.models.Conversation.get ({
      id: conversationId,
    });
    if (errors)
        return;

    this.chatName = conv.name;
    if (!isDroneAssigned(conv.droneId) && this.authService.isPilot())
      {
        const {data: dronesQuery } = await client.models.Drone.list();
        this.drones = dronesQuery;
        this.isDroneModalOpen = true;
      }
    const {data: msgs } = await conv.messages();

    for (const msg of msgs) {
      this.pushMessageType(msg);
    }

    this.scrollToBottomDelay();
    this.convSub = client.models.Message.onCreate( { 
      filter: {
        conversationId: {
          eq: conv.id,
        },
      }
    },).subscribe({
      next: (data) => {
        this.pushMessageType(data);
        this.scrollToBottomNow()
      },
      error: (error) => console.warn(error),
    });

    // update lastRead
    var now = new Date();
    const {data: userConv } = await client.models.UserConversation.list ({
      filter: {
        and: [
          { userConversationId: { eq: conv.id }},
        ]
      }
    });

    // update last read of current reader
    const findMe = userConv.find(({userId}) => userId == this.userMe.id)
    if (findMe) {
      const {data: userConvUpdate} = await client.models.UserConversation.update({
        id: findMe.id,
        lastRead: now.toISOString()
      })
    }

    // get the other party. Maybe not exist if pilot not assigned
    const findOther = userConv.find(({userId}) => userId != this.userMe.id)
    if (findOther) {
      getUser(findOther.userId, (result) => {
        this.userOther = result;
      });
      getUserProfilePhoto(findOther.userId, (url) => {
        this.userOtherPhoto = url;
      });
    }
  }

  async setDrone(id:string, name:string) {
    const now = new Date();
    // connect the pilot to the chat
    const {data: convUser } = await client.models.UserConversation.create({
      userId: this.userMe.id,
      userConversationId: this.conversationId,
      lastRead: now.toISOString(),
    });
    // put message for subscriber
    const {data: droneMsg } = await client.models.Message.create({
      content: "Drone " + name + " assigned.  Your pilot is " + this.userMe.username + ". Stay close.",
      isSent: true,
      isText: true,
      conversationId: this.conversationId,
      sender: this.userMe.id
    });
    // update the drone.  This will release user from wait mode on Order
    const {errors, data: conv } = await client.models.Conversation.update ({
      id: this.conversationId,
      droneId: id,
      name: name,
      active: true
    });

    const {data: msgs } = await conv.messages();
    this.messages = msgs;
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToVideoCall() {
    this.router.navigate(['video-call'])
  }

  goToCall() {
    this.router.navigate(['call'])
  }

  goToCancel() {
      this.alertCtl.create({
        header: 'Are you sure?',
        message: 'Do you want cancel this order?'
        , buttons: [
          {
          text: 'No',
          role: 'no'
          },
          {
            text: 'Yes',
            handler: async () => {
              const {errors, data: conv } = await client.models.Conversation.update ({
                id: this.conversationId,
                active: false
              });
              this.zone.run(() => {
                this.router.navigate(['/tabs/chat']);
              })
            }
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });  
  }

  async goToAttachPhoto(isCamera: boolean) {
    var image: any;
    if (isCamera) {
      image = await Camera.getPhoto({
        quality: 90,
        // width: 300,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
    }
    else {
      const images = await Camera.pickImages({
        quality: 90,
        // width: 300,
        limit: 1
      });
      image = images.photos[0];
    }
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    // Can be set to the src of an image now
    let blob = await fetch(image.webPath).then(r => r.blob());
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob);
  
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    const pathImage = "chat-submissions/" + this.conversationId + "/" + uuid + ".png";
    fileReader.onload = async (event) => {
      try {
        const result = await uploadData({
              data: event.target.result, 
              path: pathImage,
          });
      } catch (e) {
        console.log("error", e);
      }
    };

    // set the message with weburl as content
    const {data: msg } = await client.models.Message.create({
      content: pathImage,
      isSent: true,
      isText: false,
      conversationId: this.conversationId,
      sender: this.userMe.id
    });

    this.setAttachOpenModal(false);

    const newCount = this.userMe.imageCount + 1
    const {data: updateUser} = await client.models.User.update({
      id: this.userMe.id,
      imageCount: newCount,
    });
    this.userMe = this.authService.updateUserDB(updateUser);
  }
  
  goToAttachGallery() {
    this.setAttachOpenModal(false);
  }

  scrollToBottomDelay(){
    setTimeout(() => {
      if (this.content.scrollToBottom) {
          this.content.scrollToBottom(400);
      }
    }, 500);
  }

  scrollToBottomNow(){
    if (this.content.scrollToBottom) {
        this.content.scrollToBottom(400);
    }
}

  async goToSend(sendObj) {
    const { data: msg } = await client.models.Message.create({
      content: sendObj.value,
      isSent: true,
      isText: true,
      conversationId: this.conversationId,
      sender: this.userMe.id,
    });

    // update counts, async
    const newCount = this.userMe.textCount + 1
    const {data: updateUser} = await client.models.User.update({
      id: this.userMe.id,
      textCount: newCount,
    });
    this.userMe = this.authService.updateUserDB(updateUser);

    sendObj.value = ""
  }

  setDroneOpenModal(isOpen: boolean) {
    this.isDroneModalOpen = isOpen;
  }

  setAttachOpenModal(isOpen: boolean) {
    this.isAttachModalOpen = isOpen;
  }
}

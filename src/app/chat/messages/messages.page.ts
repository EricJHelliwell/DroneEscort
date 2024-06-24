
import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { AuthGuardService } from '../../auth/auth-route-guard.service'
import { parseISO } from 'date-fns';
import { isDroneAssigned } from '../../library/order'
import { getUser, getUserProfilePhoto } from '../../library/user';

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

  async loadMessage(conversationId) {
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
    this.messages = msgs.sort(function(a, b) {
      return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
    });
    this.scrollToBottom();
    this.convSub = client.models.Message.onCreate( { 
      filter: {
        conversationId: {
          eq: conv.id,
        },
      }
    },).subscribe({
      next: (data) => {this.messages.push(data); this.scrollToBottom()},
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
    const {data: userConvUpdate} = await client.models.UserConversation.update({
      id: findMe.id,
      lastRead: now.toISOString()
    })

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
    const {errors, data: conv } = await client.models.Conversation.update ({
      id: this.conversationId,
      droneId: id,
      name: name,
      active: true
    });
    const now = new Date();
    const {data: droneMsg } = await client.models.Message.create({
      content: "Drone " + name + " assigned.  Stay close.",
      isSent: true,
      isText: true,
      conversationId: this.conversationId,
      sender: "System"
    });
    const {data: msgs } = await conv.messages();
    this.messages = msgs;

    // now connect the pilot to the chat
    const {data: convUser } = await client.models.UserConversation.create({
      userId: this.userMe.id,
      userConversationId: this.conversationId,
      lastRead: now.toISOString(),
    });

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

  goToAttachPhoto() {
    this.setAttachOpenModal(false);
  }
  
  goToAttachGallery() {
    this.setAttachOpenModal(false);
  }

  scrollToBottom(){
    setTimeout(() => {
      if (this.content.scrollToBottom) {
          this.content.scrollToBottom(400);
      }
  }, 500);
  }

  async goToSend(sendObj) {
    const {data: droneMsg } = await client.models.Message.create({
      content: sendObj.value,
      isSent: true,
      isText: true,
      conversationId: this.conversationId,
      sender: this.userMe.id,
    });
    console.log(droneMsg);
    sendObj.value = ""
    this.scrollToBottom();
  }

  setDroneOpenModal(isOpen: boolean) {
    this.isDroneModalOpen = isOpen;
  }

  setAttachOpenModal(isOpen: boolean) {
    this.isAttachModalOpen = isOpen;
  }
}

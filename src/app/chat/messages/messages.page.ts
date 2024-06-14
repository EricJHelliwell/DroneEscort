
import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { AuthGuardService } from '../../auth/auth-route-guard.service'

const client = generateClient<Schema>();

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  chatName = "";
  messages: any[] = [];
  drones: any[] = [];
  userId = "";
  isModalOpen = false;
  conversationId = "";

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

  ionViewDidEnter(){
    this.loadMessage(this.conversationId)
    this.userId = this.authService.userDatabaseId();
  }

  ionViewDidLeave() {
  }

  async loadMessage(conversationId) {
    const {errors, data: conv } = await client.models.Conversation.get ({
      id: conversationId,
    });
    if (errors)
        return;
    this.chatName = conv.name;
    if (conv.droneId == "unassigned" && this.authService.isPilot())
      {
        const {data: dronesQuery } = await client.models.Drone.list();
        this.drones = dronesQuery;
        this.isModalOpen = true;
      }
    const {data: msgs } = await conv.messages();
    this.messages = msgs;

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
      createdAt: now.toISOString(),
      isSent: true,
      conversationId: this.conversationId,
      sender: "System"
    });
    const {data: msgs } = await conv.messages();
    this.messages = msgs;

    // now connect the pilot to the chat
    const {data: convUser } = await client.models.UserConversation.create({
      userId: this.userId,
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

  goToAttach() {

  }
  
  async goToSend(textToSend) {
    const now = new Date();
    const {data: droneMsg } = await client.models.Message.create({
      content: textToSend,
      createdAt: now.toISOString(),
      isSent: true,
      conversationId: this.conversationId,
      sender: this.userId,
    });
  }

  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}

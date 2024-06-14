
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { AuthGuardService } from '../auth/auth-route-guard.service'

import User from '../types/user';
import Conversation from '../types/conversation';
import UserConversation from '../types/userConversation';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  user: any;
  conversations: any[] = [];
  subUserConv = null;
  subUnassigned = null;

  constructor(public router: Router,
    public navCtrl: NavController, private authService: AuthGuardService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.conversations = [];
    this.getUserConversations();
    if (this.authService.isPilot)
      this.getPilotConvos();
  }

  ionViewDidLeave() {
    if (this.subUserConv) this.subUserConv.unsubscribe();
    if (this.subUnassigned) this.subUnassigned.unsubscribe();
  }

  async getUserConversations() {
    const {data: user } = await client.models.User.get ({
      id: this.authService.userDatabaseId(),
    });
    const {data: userConvs } = await user.conversations();

    for (const conv of userConvs) {
        const {data: convDetail } = await conv.conversation();
        this.pushAndSort(convDetail);
    }

    this.subUserConv = client.models.UserConversation.onCreate( { 
      filter: {
        userId: {
          eq: this.authService.userDatabaseId(),
        },
      }
    }).subscribe({
      next: (data) => {
        data.conversation().then((convDetail) => {
          this.pushAndSort(convDetail.data);
        });
      }
    });
  }

  async getPilotConvos() {
    // now get ones that not assigned a drone
    const {data: unassignedConversations } = await client.models.Conversation.list ({
      filter: {
        and: [
          { droneId: { eq: "unassigned" }},
          { active: { eq: true }},
        ]
      }
      });
    for (const conv of unassignedConversations) {
      this.pushAndSort(conv);
    }

    //subscribe
      this.subUnassigned = client.models.Conversation.onCreate({ 
        filter: {
          and: [
            { droneId: { eq: "unassigned" }},
            { active: { eq: true }},
          ]
        }
      })
      .subscribe({
        next: (data) => { this.pushAndSort(data); }
      });
  }

  
  async pushAndSort(newConv)
  {
    if (newConv.active == false)
      return;
    // add the unread message count dynamically to object
    const {data: msgs } = await newConv.messages();
    newConv.msgCount = msgs.length;
    
    this.conversations.push(newConv);
    this.conversations = this.conversations.sort(function(a, b) {
      return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
    });
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToMessage(id) 
  {
    this.router.navigate(['/tabs/chat'], {
      queryParams: { conversationId: id }
    });
  }

}

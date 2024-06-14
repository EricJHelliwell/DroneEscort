
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

  constructor(public router: Router,
    public navCtrl: NavController, private authService: AuthGuardService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.authService.isSubscriber())
      this.getSubscriberConvos();
    else if (this.authService.isPilot)
      this.getPilotConvos();
  }

  async getSubscriberConvos() {
    this.conversations = [];

    const {data: user } = await client.models.User.get ({
      id: this.authService.userDatabaseId(),
    });
    const {data: userConvs } = await user.conversations();

    for (const conv of userConvs) {
        const {data: convDetail } = await conv.conversation();
        if (convDetail.active == true) {
          this.conversations.push(convDetail);
        }
    }
  }

  async getPilotConvos() {
    this.conversations = [];

    // first get existing conversations for the pilot
    const {data: user } = await client.models.User.get ({
      id: this.authService.userDatabaseId(),
    });
    const {data: userConvs } = await user.conversations();

    for (const conv of userConvs) {
        const {data: convDetail } = await conv.conversation();
        if (convDetail.active == true) {
          this.conversations.push(convDetail);
        }
    }

    // now get ones that not assigned a drone
    const {data: unassignedConversations } = await client.models.Conversation.list ({
      filter: {
        droneId: {
          eq: "unassigned"
        }
      }
    });
    for (const conv of unassignedConversations) {
      this.conversations.push(conv);
  }
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

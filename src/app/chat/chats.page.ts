/**
 * Chatter - Chat themes Ionic 4 (https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */




import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import outputs from '../../../amplify_outputs.json';

import User from '../types/user';
import Conversation from '../types/conversation';
import UserConversation from '../types/userConversation';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { CompositeDependable } from 'aws-cdk-lib/aws-iam';

const client = generateClient<Schema>();

@Component({
  selector: 'chat',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsTabPage implements OnInit {
  segmentTab: any;
  chatData: ({ "name": string; "image": string; "description": string; "count": string; "time": string; } | { "name": string; "image": string; "description": string; "time": string; "count"?: undefined; })[];
  users: any[] = [];
  _user: User;

//  conversations: UserConversation[] = [];
  conversations: any[] = [];

  constructor(public route: Router) {
  }
  
  ngOnInit() {
    this.getAllUsers();
    this.getAllConvos()
  }

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
    console.log(this.segmentTab);
  }
  goforChat(chat) {
    console.log('goforChat');
    this.route.navigate(['/tabs/chats/conversation-details', chat]);
  }

  getAllUsers() {
    try {
      client.models.User.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.users = items;
        },
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
}

  getAllConvos() {
    try {
      client.models.UserConversation.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.conversations = items;
        },
      });
    } catch (error) {
      console.error('error fetching conversations', error);
    }
  }
}

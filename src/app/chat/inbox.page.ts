
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

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

  user: User;

  constructor(public router: Router,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.getAllConvos();
  }

  getAllConvos() {
  
  }

  goToBack() {
    this.navCtrl.back();
  }

  goToMessage(row) {
    if (row.i == 0)
      this.router.navigate(['tabs/chat/messages'])
  }

}

/**
 * Chatter - Chat themes Ionic 4 (https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'conversation-details',
  templateUrl: './conversation-details.html',
  styleUrls: ['./conversation-details.scss'],
})
export class ConversationDetailPage implements OnInit {

  conversation = [
    { text: 'Hey, that\'s an awesome chat UI', sender: 0, image: 'assets/images/sg2.jpg' },
    { text: 'Right, it totally blew my mind', sender: 1, image: 'assets/images/sg1.jpg', read: true, delivered: true, sent: true },
    { text: 'And it is free ?', sender: 0, image: 'assets/images/sg2.jpg' },
    { text: 'Yes, totally free', sender: 1, image: 'assets/images/sg1.jpg', read: true, delivered: true, sent: true },
    { text: 'Wow, that\'s so cool', sender: 0, image: 'assets/images/sg2.jpg' },
    { text: 'Hats off to the developers', sender: 1, image: 'assets/images/sg1.jpg', read: false, delivered: true, sent: true },
    { text: 'Oh yes, this is gooood stuff', sender: 0, image: 'assets/images/sg2.jpg' },
    { text: 'Check out their other designs ', sender: 1, image: 'assets/images/sg1.jpg', read: false, delivered: false, sent: true }

  ]
  phone_model = 'iPhone';
  input = '';

  constructor(private platform: Platform,
    public alertController: AlertController, private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');

    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
    
  }


  send() {
    if (this.input != '') {
      this.conversation.push({ text: this.input, sender: 1, image: 'assets/images/sg1.jpg' });
      this.input = '';
      setTimeout(() => {
        this.scrollToBottom()
      }, 10)
    }
  }

  scrollToBottom(){
    let content = document.getElementById("chat-container");
    let parent = document.getElementById("chat-parent");
    let scrollOptions = {
      left: 0,
      top: content.offsetHeight
    }
    
    parent.scrollTo(scrollOptions)
  }


}

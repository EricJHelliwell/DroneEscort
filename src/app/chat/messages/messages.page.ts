
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(public router: Router,
    public navCtrl: NavController) { }

  ngOnInit() {
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

  messages = [
    {
      side: 'left',
      msg: 'Hi.  I am Andrew your Drone Escort Operator today',
    },
    {
      side: 'left',
      msg: 'I am sending the drone to you now.',
    },
    {
      side: 'left',
      msg: 'Your coordinates are: lat: 35.972301215474836, lng: -79.9959223121594',
    },
    {
      side: 'left',
      msg: 'You can send me any text updates here or request a call up above.',
    },
    {
      side: 'right',
      msg: 'yes of course',
    },
  ];

}

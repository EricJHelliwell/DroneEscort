
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { getUrl } from "aws-amplify/storage";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

type PhotoStorage = {
  userId: string,
  url: string
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  user: any;
  activeUsers: string[] = [];
  activePhotos: PhotoStorage[] = [];
  conversations: any[];
  subUserConv = null;
  subUnassigned = null;
  subMessages = null;

  constructor(public router: Router,
    public navCtrl: NavController, private authService: AuthGuardService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.conversations = [];
    this.getUserConversations();
    if (this.authService.isPilot)
      this.getPilotConvos();
    this.watchMessages();
  }

  ionViewDidLeave() {
    if (this.subUserConv) this.subUserConv.unsubscribe();
    if (this.subUnassigned) this.subUnassigned.unsubscribe();
    if (this.subMessages) this.subMessages.unsubscribe();
  }

  async watchMessages() {
    this.subMessages = client.models.Message.onCreate( {} )
    .subscribe({
      next: (data) => {
        const result = this.conversations.find((conv) => data.conversationId == conv.id);
        if (result) {
          result.msgCount++;
          result.lastUpdatedAt = data.createdAt;       }
      }
    });
  }

  async getUserConversations() {
    const {data: user } = await client.models.User.get ({
      id: this.authService.userDatabaseId(),
    });
    const {data: userConvs } = await user.conversations();

    for (const conv of userConvs) {
        const {data: convDetail } = await conv.conversation();
        this.pushAndSort(convDetail, conv.lastRead);
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
          this.pushAndSort(convDetail.data, data.lastRead);
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
      this.pushAndSort(conv, null);
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
        next: (data) => { this.pushAndSort(data, null); }
      });
  }

  
  async pushAndSort(newConv, dateLastRead)
  {
    if (newConv.active == false)
      return;
    // add the unread message count dynamically to object
    const {data: msgs } = await newConv.messages();
    const result = msgs.filter((msg) => !dateLastRead || msg.createdAt > dateLastRead );
    newConv.msgCount = result.length;
    // now find the date of the last message so it can be shown
    newConv.lastUpdatedAt = new Date(
      Math.max(
        ...msgs.map(element => {
          return new Date(element.createdAt);
        }),
      ),
    );
    
    // add the conversation in sorted order  
    this.conversations.push(newConv);
    this.conversations = this.conversations.sort(function(a, b) {
      return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
    });

    // add any counterparts to the Active list
    const {errors, data: actives } = await client.models.UserConversation.list ({ 
      filter: {
        and: [
          { userConversationId: { eq: newConv.id }},
          { userId: { ne: this.authService.userDatabaseId() }}
        ]
      }
    });
    if (errors)
      return;
    for (const activeUser of actives) {
      const found = this.activeUsers.find((userId) => userId == activeUser.userId);
      if (!found) {
        this.activeUsers.push(activeUser.userId); 
        const result = await getUrl({path: "profile-pictures/" + activeUser.userId + ".png"});
        const testURLReq = await fetch(result.url);
        if (testURLReq.status != 404) {
          this.activePhotos.push({userId: activeUser.userId, url: result.url.toString()});
        }
        else {
          // user does not have a valid photo, so substitute and avatar
          this.activePhotos.push({userId: activeUser.userId, url: '../assets/icon/avatar.png'});
        }
      }
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

  getProfile(id) {
    this.router.navigate(['/tabs/profile'], {
      queryParams: { userId: id }
    });
  }
}

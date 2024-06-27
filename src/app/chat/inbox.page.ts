
import { Component, OnInit } from '@angular/core';
import { Router, IsActiveMatchOptions  } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { getUrl } from "aws-amplify/storage";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { getUserProfilePhoto, getUser } from '../library/user'

const client = generateClient<Schema>();

type PhotoStorage = {
  userId: string,
  conversationId: string,
  createdAt: string,
  username: string,
  url: string
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  user: any;
  activePhotos: PhotoStorage[] = [];
  conversations: any[];
  subUserConv = null;
  subUnassigned = null;
  subMessages = null;
  subConvUpdates = null;

  constructor(public router: Router,
    public navCtrl: NavController, private authService: AuthGuardService) { }

  ngOnInit() {
    this.conversations = [];
    this.getUserConversations();
    if (this.authService.isPilot)
      this.getPilotConvos();
    this.watchMessages();
  }

  ngOnDestoy() {
    if (this.subUserConv) this.subUserConv.unsubscribe();
    if (this.subUnassigned) this.subUnassigned.unsubscribe();
    if (this.subMessages) this.subMessages.unsubscribe();
    if (this.subConvUpdates) this.subConvUpdates.unsubscribe();
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
  }

  async watchMessages() {
    this.subMessages = client.models.Message.onCreate( {} )
    .subscribe({
      next: (data) => {
        const result = this.conversations.find((conv) => data.conversationId == conv.id);
        if (result) {
          const isActive = this.router.isActive('/tabs/chat', {
            matrixParams: 'ignored',
            queryParams: 'ignored',
            fragment: 'ignored',
            paths: 'exact'
          });
          // only update msg count if I am the active page
          if (isActive) {
            result.msgCount++;
          } 
          result.lastUpdatedAt = data.createdAt;      
         }
      }
    });
  }

  async watchNewUnassigned() {
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
      next: (data) => {
        // if we don't have it, add it 
        const result = this.conversations.find((conv) => data.id == conv.id);
        if (!result) {
          this.pushAndSort(data, null); 
        }
      }
    });
  }

  async watchNewUserConversation() {
    this.subUserConv = client.models.UserConversation.onCreate( { 
      filter: {
        userId: {
          eq: this.authService.userDatabaseId(),
        },
      }
    }).subscribe({
      next: (data) => {
        const result = this.conversations.find((conv) => data.id == conv.id);
        if (!result) {
          data.conversation().then((convDetail) => {
            this.pushAndSort(convDetail.data, data.lastRead);
          });
        }
      }
    });
  }

  async watchConversationUpdates() {
    this.subConvUpdates = client.models.Conversation.onUpdate({ 
    })
    .subscribe({
      next: (data) => {
        // if we don't have it, ignor
        const result = this.conversations.find((conv) => data.id == conv.id);
        if (result) {
          // remove old copy and update if it is not inactive
          this.conversations.splice(this.conversations.findIndex((conv) =>  
              data.id == conv.id), 1);
          // remove active photo
          this.activePhotos.splice(this.activePhotos.findIndex((conv) => 
              data.id == conv.conversationId ), 1);
          if (data.active == true) {
            this.pushAndSort(data, null);
          } 
        }
      }
    });
  }

  async getUserConversations() {
    const {data: userConvs } = await client.models.UserConversation.list({
      filter: {
        userId: {eq: this.authService.userDatabaseId()}
      }
    });

    for (const conv of userConvs) {
        const {data: convDetail } = await conv.conversation();
        if (convDetail) {
          this.pushAndSort(convDetail, conv.lastRead);
        }
    }

    // we only watch subscribers since pilots watch unassigned
    if (this.authService.isSubscriber()) {
      this.watchNewUserConversation();
    }

    this.watchConversationUpdates();
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

    this.watchNewUnassigned();
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
      var newUser: any;
      await getUser(activeUser.userId, (result) => {
        newUser = result;
      });

      await getUserProfilePhoto(activeUser.userId, (url) => {
        this.activePhotos.push({
          userId: activeUser.userId, 
          conversationId: newConv.id,
          createdAt: newConv.createdAt, 
          username: newUser.username,
          url: url
        });
        this.activePhotos.sort(function(a, b) {
          return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
        });
      });
    }
  }
  

  goToBack() {
    this.navCtrl.back();
  }

  goToProfile(id)
  {
    this.router.navigate(['./profile', id]);
  }

  goToConversation(id) {
    const result = this.conversations.find((conv) => id == conv.id);
    if (result) {
      result.msgCount = 0;
      this.router.navigate(['/message', id]);
    }
  }
}

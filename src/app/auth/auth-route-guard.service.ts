import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot  } from '@angular/router';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { Component, OnInit } from '@angular/core';

import User from '../types/user';
import Conversation from '../types/conversation';
import UserConversation from '../types/userConversation';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();


@Injectable()
export class AuthGuardService implements OnInit {
  loggedIn: boolean = false;
  authDetails: any = null;
  userDBId: string = "";  // internal Dynamo DB

  constructor(public router: Router) {

    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          console.log('user has been signedIn successfully.');
          this.checkDBUser();
          break;
        case 'signedOut':
          console.log('user has been signedOut successfully.');
          this.loggedIn = false;
          this.authDetails = null;
          this.userDBId = "";
          break;
        case 'tokenRefresh':
          console.log('auth tokens have been refreshed.');
          break;
        case 'tokenRefresh_failure':
          console.log('failure while refreshing auth tokens.');
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
          break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          break;
      }
    });
  }

  async ngOnInit() {
    await this.checkDBUser();
  }

  async checkDBUser() {
    await fetchAuthSession()
    .then((auth) => {
      this.loggedIn = true;
      this.authDetails = auth.tokens.idToken.payload;
    })
    .catch(err => {
      console.log(err);
      this.loggedIn = false;
      this.authDetails = null;
      this.userDBId = "";
      this.router.navigate(['/login']);
      return;
    });

    // create user in DB for conversations if not already there
    const { data: existingUser } = await client.models.User.list({
      filter: {
        cognitoId: {
          eq: this.authDetails.sub
        }
      }
    });

    if (!existingUser || existingUser.length === 0) {
      const { data: newuser } = await client.models.User.create({
        cognitoId: this.authDetails.sub,
        username: this.authDetails.preferred_username,
        registered: true,
      });
      this.userDBId = newuser.id;
    }
    else {
      this.userDBId = existingUser[0].id;
    }
    this.router.navigate(['/tabs/order']);
  }    

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  public isPilot() : boolean {
    return this.authDetails['cognito:groups'].includes("PILOTS");
  }

  public isSubscriber() : boolean {
    return this.authDetails['cognito:groups'].includes("SUBSCRIBERS");
  }

  public userPreferredName(): string {
    return this.authDetails.preferred_username;
  }

  public userDatabaseId() : string {
    return this.userDBId;
  } 

}


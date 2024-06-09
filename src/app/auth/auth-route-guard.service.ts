import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot  } from '@angular/router';
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
export class AuthGuardService implements CanActivate {
  authDetails = null;

  constructor(public router: Router) {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          console.log('user have been signedIn successfully.');
          this.checkDBUser()
          .then((auth) => {
            this.router.navigate(['/tabs/order']);
          })
          break;
        case 'signedOut':
          console.log('user have been signedOut successfully.');
          this.authDetails = null;
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
  
  
  async checkDBUser() {
    await fetchAuthSession()
    .then((auth) => {
      this.authDetails = auth.tokens.idToken.payload;
    })
    .catch(err => {
      // should not happen
      this.router.navigate(['/login']);
    });

    // create user in DB for conversations if not already there
    const { data: user } = await client.models.User.list({
      filter: {
        userId: {
          eq: this.authDetails.sub
        }
      }
    });
    console.log(user)
    if (!user || user.length === 0) {
      const { data: newuser } = await client.models.User.create({
        userId: this.authDetails.sub,
        username: this.authDetails.preferred_username,
        registered: true,
      });
    }
    this.router.navigate(['/tabs/order']);
  }    

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    if (!this.authDetails)
      this.router.navigate(['/login']);
    return this.authDetails;
  }
}


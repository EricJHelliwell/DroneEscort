import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot  } from '@angular/router';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { Component, OnInit } from '@angular/core';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();


@Injectable()
export class AuthGuardService implements OnInit {
  private loggedIn: boolean = false;
  private authDetails: any = null;
  private userDB: any;  // internal Dynamo DB

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
          this.userDB = null;
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
    console.log('init user');
    await this.checkDBUser();
  }

  async checkDBUser() {
    await fetchAuthSession()
    .then((auth) => {
      this.loggedIn = true;
      this.authDetails = auth.tokens.idToken.payload;
      console.log(this.authDetails);
    })
    .catch(err => {
      console.log(err);
      this.loggedIn = false;
      this.authDetails = null;
      this.userDB = null;
      this.router.navigate(['/login']);
      return;
    });

    // create user in DB for conversations if not already there
    const { errors, data: existingUser } = await client.models.User.list({
      filter: {
        cognitoId: {
          eq: this.authDetails.sub
        }
      }
    });
    console.log(existingUser);

    if (!existingUser || existingUser.length === 0) {
      const { errors, data: newuser } = await client.models.User.create({
        cognitoId: this.authDetails.sub,
        username: this.authDetails.preferred_username,
        email: this.authDetails.email,
        phone: this.authDetails.phone_number,
        registered: true,
      });
      this.userDB = newuser;
    }
    else if ((existingUser[0].email != this.authDetails.email)
      || (existingUser[0].phone != this.authDetails.phone_number)
      || (existingUser[0].username != this.authDetails.preferred_username))
    {
      const { errors, data: updateuser } = await client.models.User.update({
        id: existingUser[0].id,
        username: this.authDetails.preferred_username,
        email: this.authDetails.email,
        phone: this.authDetails.phone_number,
      });
      this.userDB = updateuser;
    }
    else {
      this.userDB = existingUser[0];
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

  public userEmail(): string {
    return this.authDetails.email;
  }

  public userEmailDomain(): string {
    return this.authDetails.email.split('@')[1];
  }

  public userphone(): string {
    return this.authDetails.phone_number;
  }

  public userDatabaseId() : string {
    return this.userDB.id;
  } 

  public userDatabase() : any {
    return this.userDB;
  } 

  public updateUserDB(newUser) : any {
    this.userDB = newUser;
  } 

  public async refreshUserDB() {
    const { errors, data: existingUser } = await client.models.User.get({
      id: this.userDB.id
    });
    if (!errors) {
      this.userDB = existingUser;
    }
  }

}


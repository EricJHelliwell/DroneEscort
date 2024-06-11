import { Component, AfterContentInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AuthGuardService } from '../auth-route-guard.service';
import { Router } from '@angular/router';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import outputs from '../../../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

Amplify.configure(outputs);

@Component({
  selector: 'app-page-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements AfterContentInit{

  // including AuthGuardService here so that it's available to listen to auth events
  authService: AuthGuardService

  background = {
    backgroundImage: 'url(../../../assets/images/Campus_Drone3.jpeg)'
  };

  constructor(public guard: AuthGuardService, private route: Router) {
    this.authService = this.guard;
    getCurrentUser()
    .then((auth) => {
      // map the user in memory if not already
      guard.checkDBUser();
    })
    .catch((err) => {
      ; // no login we just stay on page to get creds
    })
  }

  ngAfterContentInit(){
  }

  login() {
    console.log('login');

  }

  logout() {
    console.log('logout');

  }

}

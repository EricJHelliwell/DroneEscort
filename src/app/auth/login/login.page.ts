import { Component, AfterContentInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AuthGuardService } from '../auth-route-guard.service';
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

  constructor(public guard: AuthGuardService) {
    this.authService = guard;
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

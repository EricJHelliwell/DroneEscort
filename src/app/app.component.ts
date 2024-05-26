import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';import { BrowserModule } from '@angular/platform-browser';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }}

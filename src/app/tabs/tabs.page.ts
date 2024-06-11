import { Component } from '@angular/core';
import { AuthGuardService } from '../auth/auth-route-guard.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isPilot: boolean = false;   
  isSubscriber: boolean = false; 

  constructor(private authService: AuthGuardService) 
  {
    this.isPilot = this.authService.isPilot();
    console.log('isPilot = ' + this.isPilot);
    this.isSubscriber = this.authService.isSubscriber();
    console.log('isSubscriber = ' + this.isSubscriber);  }

}

import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular'
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  isPilot: boolean = false;   
  isSubscriber: boolean = false; 
  private activeTab?: HTMLElement;

  constructor(private authService: AuthGuardService, private platform: Platform)
  {
    this.isPilot = this.authService.isPilot();
    console.log('isPilot = ' + this.isPilot);
    this.isSubscriber = this.authService.isSubscriber();
    console.log('isSubscriber = ' + this.isSubscriber);
    console.log('Current user id: ' + this.authService.userDatabaseId());
  }

  async ngOnInit() {
  }

  tabChange(tabsRef: IonTabs) {
    this.activeTab = tabsRef.outlet.activatedView.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }
  
  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }
  
  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }
  
  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }
  
  private propagateToActiveTab(eventName: string) {    
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { createNewOrder, cancelOrder, monitorOrder, cancelMonitorOrder,
         sendOrderMessage, isOrderActive } from '../library/order'
import { setUserLocation, watchUserLocationUpdate, watchUserLocationCancel } from '../library/user'
import { createMap, disposeMap } from '../library/map';
import { getActiveConvUsers } from '../library/chat';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  loading: boolean = true;
  watchId: any;
  coordinates: any;
  isPilot: boolean = false;   
  isSubscriber: boolean = false; 
  userId: string;
  isEmergencyModalOpen: boolean = false;

  // @ViewChild('map', { static: true }) mapElement: ElementRef;
  // map: any;

  orderText: string;
  orderColor: string;
  ReqId: any  = null;

  constructor(public router: Router, private alertCtl: AlertController
      , private loadingCtrl: LoadingController, private zone: NgZone
      , private authService: AuthGuardService) {
    this.userId = this.authService.userDatabaseId();
  }

  async ngOnInit() {
    this.showOrderButton();
    this.isPilot = this.authService.isPilot();
    this.isSubscriber = this.authService.isSubscriber();

    // if a subscriber, just use own id on map, else pilot sees all active users
    var userIds = [ this.userId ];
    if (this.isPilot) {
      userIds = await getActiveConvUsers();
      // remove pilot
      userIds.splice(userIds.indexOf(this.userId), 1);
    };

    setUserLocation(this.userId, (coords) => {
      this.loading = false;
      this.coordinates = coords;
      // use gmap format for centering the map.  default is current user location
      var centerCords = {
        lat: this.coordinates.latitude,
        lng: this.coordinates.longitude
      };

      setTimeout(() => {
          createMap(userIds, this.authService.userEmailDomain(), centerCords);
      }, 1000);
    });
  }

  ngOnDestroy() {
    disposeMap();
  }

  ionViewDidEnter(){
    if (this.isSubscriber) {
      watchUserLocationUpdate(this.userId, this.zone, (coords) => {
        this.coordinates = coords;

        const messageToDisplay = 'User location change.  New geo:\nlat: ' + 
        this.coordinates.latitude + '\nlong: ' + this.coordinates.longitude;
        sendOrderMessage(this.userId, messageToDisplay);
      });

 
    if (isOrderActive()) {
      this.showCancelButton()
      }
    }
  }

  ionViewCanLeave() {
  }

  ionViewDidLeave() {
    if (this.isSubscriber) {
      watchUserLocationCancel();
      cancelMonitorOrder();
    }
  }

  async showLoading() {
    const messageToDisplay = this.authService.userPreferredName() + ' requested a drone.  You will be met at geo:\nlat: ' + 
        this.coordinates.latitude + '\nlong: ' + this.coordinates.longitude;

    const loading = await this.loadingCtrl.create({
      cssClass: "custom-loading",
      backdropDismiss: true,
      message: messageToDisplay,
      duration: 600000,
    });

    // Create and Subscribe to order
    this.ReqId = await createNewOrder(this.authService.userDatabase(), false);
    this.authService.refreshUserDB();
    sendOrderMessage(this.userId, messageToDisplay);

    const WatchId = monitorOrder((result) => {
      console.log(result);
      if (result == "Cancelled") {
        loading.dismiss();
        this.zone.run(() => {this.showCancelling();});
      }
      else if (result == "Accepted") {
        loading.dismiss();
        this.showOrderButton();
        this.zone.run(() => {
          this.router.navigate(['/message', this.ReqId])});
      }
    });

    loading.present();
    this.showCancelButton();
  }

  async showCancelling() {
    this.showCancelButton();
    const loading = await this.loadingCtrl.create({
      message: 'Cancelling your request for drone...',
      duration: 2000,
    });
    
    loading.present();
    cancelOrder();
    cancelMonitorOrder();
    this.showOrderButton();
    this.ReqId = null;
  }

  showOrderButton() {
    this.orderText = "Call a Drone";
    this.orderColor = "success";
  }

  showCancelButton() {
    this.orderText = "Cancel";
    this.orderColor = "warning";
  }

  onOrder()
  {
    if (this.orderText == "Cancel")
      {
        this.alertCtl.create({
          header: 'Are you sure?',
          message: 'Do you want cancel this order?'
          , buttons: [
            {
            text: 'No',
            role: 'no'
            },
            {
              text: 'Yes',
              handler: async () => {
                await this.showCancelling();
              }
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });  
      }
    else {
      this.alertCtl.create({
        header: 'Are you sure?',
        message: 'Do you want request a drone escort?'
        , buttons: [
          {
          text: 'Cancel',
          role: 'cancel'
          },
          {
            text: 'Order',
            handler: async () => {
              await this.showLoading();
            }
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }

  async onEmergency() {
    const messageToDisplay = this.authService.userPreferredName() + 
        ' called emergency at geo:\nlat: ' + 
        this.coordinates.latitude + '\nlong: ' + this.coordinates.longitude; 
    this.ReqId = await createNewOrder(this.authService.userDatabase(), true);
    this.authService.refreshUserDB();
    sendOrderMessage(this.userId, messageToDisplay);
    this.isEmergencyModalOpen = false;

    const WatchId = monitorOrder((result) => {
      console.log(result);
      if (result == "Cancelled") {
        this.zone.run(() => {this.showCancelling();});
      }
      else if (result == "Accepted") {
        this.showOrderButton();
        this.zone.run(() => {
          this.router.navigate(['/message', this.ReqId])});
      }
    });

    const domainPhone = await this.authService.domainPhone(); 
    window.open('tel:' + domainPhone);
  }
}

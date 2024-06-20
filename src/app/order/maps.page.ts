import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { createNewOrder, cancelOrder, monitorOrder, cancelMonitorOrder, isOrderActive } from '../library/order'
import { setUserLocation, watchUserLocationUpdate, watchUserLocationCancel } from '../library/user'
import { getULocation, test } from '../library/map';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  loading: boolean = true;
  // lat: GLfloat;
  // lng: GLfloat;
  watchId: any;
  coordinates: any;
  isPilot: boolean = false;   
  isSubscriber: boolean = false; 
  userId: string;
  userMarker: any;
  
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
    setUserLocation(this.userId, (coords) => {
      this.loading = false;
      this.coordinates = coords;
      // use gmap format for centering the map.  default is current user location
      var centerCords = {
        lat: this.coordinates.latitude,
        lng: this.coordinates.longitude
      };
      // this.lat = this.coordinates.latitude;
      // this.lng = this.coordinates.longitude;
      setTimeout(() => {
        getULocation([this.userId], this.authService.userEmailDomain(), centerCords);
      }, 1000);
    });
  }

  ionViewDidEnter(){
    watchUserLocationUpdate(this.userId, this.zone, (coords) => {
      this.coordinates = coords;
    });

    if (isOrderActive()) {
      this.showCancelButton()
      }
  }

  ionViewCanLeave() {
  }

  ionViewDidLeave() {
    watchUserLocationCancel();
    cancelMonitorOrder();
  }

  async showLoading() {
    const messageToDisplay = 'Looking for your drone.  Stay nearby.  You will be met at geo:\nlat: ' + 
        this.coordinates.latitude + '\nlong: ' + this.coordinates.longitude;

    const loading = await this.loadingCtrl.create({
      cssClass: "custom-loading",
      backdropDismiss: true,
      message: messageToDisplay,
      duration: 600000,
    });

    // Create and Subscribe to order
    this.ReqId = await createNewOrder(messageToDisplay, this.authService.userDatabase());
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
          this.router.navigate(['/tabs/chat', this.ReqId])});
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
    this.orderText = "Order";
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

}

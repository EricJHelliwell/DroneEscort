import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { Geolocation, ClearWatchOptions } from '@capacitor/geolocation';

import User from '../types/user';
import Conversation from '../types/conversation';
import UserConversation from '../types/userConversation';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();
declare var google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  loading: boolean = true;
  lat: GLfloat;
  lng: GLfloat;
  watchId: any;
  coordinates;
  isPilot: boolean = false;   
  isSubscriber: boolean = false; 
  
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;

  orderText = "Order";
  orderColor = "success";
  conversationId = "";

  constructor(public router: Router, private alertCtl: AlertController
      , private loadingCtrl: LoadingController, private zone: NgZone
      , private authService: AuthGuardService) {
  }

  async ngOnInit() {
    this.isPilot = this.authService.isPilot();
    this.isSubscriber = this.authService.isSubscriber();
    const loc = await Geolocation.getCurrentPosition();
    setTimeout(() => {
      this.loading = false;
      this.lat = loc.coords.latitude;
      this.lng = loc.coords.longitude;
      this.getULocation();
    }, 1000);
  }

  ionViewDidEnter(){
    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };
    this.watchId = Geolocation.watchPosition(options, (position, err) => {
      this.zone.runGuarded(() => {
        if (!err) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.coordinates = position.coords;
        }
      });
    });
  }

  ionViewDidLeave() {
    const opt: ClearWatchOptions = {id: this.watchId};
    Geolocation.clearWatch(opt).then(result=>{
      ;
    });
  }

  async createNewOrder(messageToDisplay:string): Promise<string> {
    const now = new Date();
    const convName = this.authService.userPreferredName() + " " + 
      now.toLocaleDateString("en-US") + " " +
      now.toLocaleTimeString("en-US");
    const reqId = this.authService.userDatabaseId();
    const {data: conv } = await client.models.Conversation.create({
      name: convName,
      createdAt: now.toISOString(),
      active: true,
      requestorId: reqId,
      droneId: "unassigned",
    });

    const {errors, data: firstMsg } = await client.models.Message.create({
      content: messageToDisplay,
      createdAt: now.toISOString(),
      isSent: true,
      conversationId: conv.id,
      sender: "System"
    });

    const {data: convUser } = await client.models.UserConversation.create({
      userId: reqId,
      userConversationId: conv.id,
      lastRead: now.toISOString(),
    });

    this.conversationId = conv.id;
    return this.conversationId;
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
    const ReqId = await this.createNewOrder(messageToDisplay);
    const updateSub = client.models.Conversation.observeQuery({  
      filter: {
      id: {
        eq: ReqId,
      },
    },
    }).subscribe({
      next: (data) => {
        console.log(data);
        // cancelled 
        if (data.items[0].active == false) {
          updateSub.unsubscribe();
          loading.dismiss();
          this.orderText = "Order";
          this.orderColor = "success";
          this.zone.run(() => {this.showCancelling();});
        }
        // fulfilled
        else if (data.items[0].droneId != "unassigned") {
          updateSub.unsubscribe();
          loading.dismiss();
          this.orderText = "Order";
          this.orderColor = "success";
          this.zone.run(() => {
            this.router.navigate(['/tabs/chat', data.items[0].id])});
        }
      },
      error: (error) => console.warn(error),
    });

    loading.present();
    this.orderText = "Cancel";
    this.orderColor = "warning";
  }

  async showCancelling() {
    this.orderText = "Order";
    this.orderColor = "success";
    const loading = await this.loadingCtrl.create({
      message: 'Cancelling your request for drone...',
      duration: 2000,
    });
    
    loading.present();
    const {errors, data: conv } = await client.models.Conversation.update ({
      id: this.conversationId,
      active: false
    });

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

  getULocation() {
    let map;
    const markersOnMap = [
      {
        placeName: 'Drone 1 (2 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: this.coordinates.latitude + (180/Math.PI)*(Math.random() * 300 / 6378137),
            lng: this.coordinates.longitude + (180/Math.PI)*(Math.random() * 300 / 6378137) / 
              Math.cos(this.coordinates.latitude)
          }
        ]
      },
      {
        placeName: 'Drone 3  (3 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: this.coordinates.latitude + (180/Math.PI)*(Math.random() * 300 / 6378137),
            lng: this.coordinates.longitude + (180/Math.PI)*(Math.random() * 300 / 6378137) / 
              Math.cos(this.coordinates.latitude)
          }
        ]
      },
      {
        placeName: 'Drone 4  (5 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: this.coordinates.latitude + (180/Math.PI)*(Math.random() * 300 / 6378137),
            lng: this.coordinates.longitude + (180/Math.PI)*(Math.random() * 300 / 6378137) / 
              Math.cos(this.coordinates.latitude)
          }
        ]
      },
      {
        placeName: 'Drone 2  (7 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: this.coordinates.latitude + (180/Math.PI) * (Math.random() * 300 / 6378137),
            lng: this.coordinates.longitude + (180/Math.PI) * (Math.random() * 300 / 6378137) / 
              Math.cos(this.coordinates.latitude)
          }
        ]
      },
    ];

    var InforObj = [];
    var centerCords = {
      lat: this.coordinates.latitude,
      lng: this.coordinates.longitude
    };
    initMap();

    function addMarker() {
      for (var i = 0; i < markersOnMap.length; i++) {
        var contentString = '<div id="content"><h1>' + markersOnMap[i].placeName +
          '</h1></div>';
        const icon = {
          url: markersOnMap[i].cover,
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };
        console.log(markersOnMap[i].LatLng[0]);
        const marker = new google.maps.Marker({
          position: markersOnMap[i].LatLng[0],
          map: map,
          animation: google.maps.Animation.DROP,
          icon: icon,
        });

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

        marker.addListener('click', function () {
          closeOtherInfo();
          infowindow.open(marker.get('map'), marker);
          InforObj[0] = infowindow;
        });

      }

      const userIcon = {
        url: '../../assets/images/profile.jpg',
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }

      const marker = new google.maps.Marker({
        position: centerCords,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: userIcon,
      });
    }

    function closeOtherInfo() {
      if (InforObj.length > 0) {
        InforObj[0].set("marker", null);
        InforObj[0].close();
        InforObj.length = 0;
      }
    }

    function initMap() {

      // map = new google.maps.Map(document.getElementById('map'), {
      //   zoom: 10,
      //   center: centerCords,
      // });
      var style = [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            { saturation: -100 }
          ]
        }
      ];

      var mapOptions = {
        zoom: 15,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        center: centerCords,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'nepate']
        },
        disableDefaultUI: true
      }

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var mapType = new google.maps.StyledMapType(style, { name: 'Grayscale' });
      const cityCircle = new google.maps.Circle({
        strokeColor: "#9d1fff",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#9d1fff",
        fillOpacity: 0.35,
        map,
        center: centerCords,
        radius: Math.sqrt(1000) * 10,
      });
      map.mapTypes.set('nepate', mapType);
      map.setMapTypeId('nepate');
      addMarker();
    }

  }

}

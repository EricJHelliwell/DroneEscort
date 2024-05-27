import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  loading: boolean = true;

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;

  constructor() {
    setTimeout(() => {
      this.loading = false;
      this.getULocation();
    }, 1000);
  }

  ngOnInit() {
  }

  getULocation() {
    let map;
    const markersOnMap = [
      {
        placeName: 'Drone 1',
        cover: '../../assets/images/drone-1.png',
        LatLng: [
          {
            lat: 35.975301215474836,
            lng: -79.9929223121594
          }
        ]
      },
      {
        placeName: 'Drone 3',
        cover: '../../assets/images/drone-1.png',
        LatLng: [
          {
            lat: 35.974301215474836,
            lng: -79.9979223121594,
          }
        ]
      },
      {
        placeName: 'Drone 4',
        cover: '../../assets/images/drone-1.png',
        LatLng: [
          {
            lat: 35.970301215474836,
            lng: -79.9939223121594
          }
        ]
      },
      {
        placeName: 'Misty May',
        cover: '../../assets/images/profile2.jpg',
        LatLng: [
          {
            lat: 35.971301215474836,
            lng: -79.9949223121594
          }
        ]
      },
      {
        placeName: 'Drone 2',
        cover: '../../assets/images/drone-1.png',
        LatLng: [
          {
            lat: 35.973301215474836,
            lng: -79.9969223121594
          }
        ]
      },
    ];

    var InforObj = [];
    var centerCords = {
      lat: 35.972301215474836,
      lng: -79.9959223121594
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

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { Geolocation, ClearWatchOptions } from '@capacitor/geolocation';
import { getUrl } from "aws-amplify/storage";
import { getUserProfilePhoto } from '../library/user'

const client = generateClient<Schema>();
declare var google: any;
var userIds: string[] = [];

export async function test() {
    const {data: dronesQuery } = await client.models.Drone.list({
        filter: {
            or: [
                {id: {eq: "511217d6-5317-4e41-abd2-7ac8e5040203"}},
                {id: {eq: "9c8ddbbb-0008-491b-85c9-5e432daf4652"}},
            ]
        }
    });
    console.log(dronesQuery);

    const droneIds = ["511217d6-5317-4e41-abd2-7ac8e5040203"];

    const filter = {
        or: droneIds.map(id => ({ id: { eq: id } }))
    };
    
    const { data: dronesQuery2 } = await client.models.Drone.list({ filter });
    console.log(dronesQuery2);
}

export async function createMap(userMarkerIds:string[], domain:string, centerCords) {
    let map;
/*
    const markersOnMap = [
      {
        placeName: 'Drone 1 (2 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: coordinates.latitude + (180/Math.PI)*(Math.random() * 300 / 6378137),
            lng: coordinates.longitude + (180/Math.PI)*(Math.random() * 300 / 6378137) / 
              Math.cos(coordinates.latitude)
          }
        ]
      },
      {
        placeName: 'Drone 3  (3 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: coordinates.latitude + (180/Math.PI)*(Math.random() * 300 / 6378137),
            lng: coordinates.longitude + (180/Math.PI)*(Math.random() * 300 / 6378137) / 
              Math.cos(coordinates.latitude)
          }
        ]
      },
      {
        placeName: 'Drone 4  (5 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: coordinates.latitude + (180/Math.PI)*(Math.random() * 300 / 6378137),
            lng: coordinates.longitude + (180/Math.PI)*(Math.random() * 300 / 6378137) / 
              Math.cos(coordinates.latitude)
          }
        ]
      },
      {
        placeName: 'Drone 2  (7 min)',
        cover: '../../assets/images/drone-2.png',
        LatLng: [
          {
            lat: coordinates.latitude + (180/Math.PI) * (Math.random() * 300 / 6378137),
            lng: coordinates.longitude + (180/Math.PI) * (Math.random() * 300 / 6378137) / 
              Math.cos(coordinates.latitude)
          }
        ]
      },
    ];
*/
    userIds = userMarkerIds;
    var InforObj = [];
/*
    var centerCords = {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
*/
    initMap();

    async function addMarker() {
/*
      for (var i = 0; i < markersOnMap.length; i++) {
        var contentString = '<div id="content"><h1>' + markersOnMap[i].placeName +
          '</h1></div>';
        const icon = {
          url: markersOnMap[i].cover,
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };
        // console.log(markersOnMap[i].LatLng[0]);
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
*/
        const filter = {
            or: userIds.map(id => ({ id: { eq: id } }))
        };

        const { data: users } = await client.models.User.list({ filter });
        for (const user of users) {
            getUserProfilePhoto(user.id, (url) => {
                const userIcon = {
                url: url,
                scaledSize: new google.maps.Size(40, 40), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
                }
        
                // add a marker to the user object
                user['marker'] = new google.maps.Marker({
                position: { lat: user.location.lat, lng: user.location.lng },
                map: map,
                animation: google.maps.Animation.DROP,
                icon: userIcon,
                });      
            });
         }
    }

    function closeOtherInfo() {
      if (InforObj.length > 0) {
        InforObj[0].set("marker", null);
        InforObj[0].close();
        InforObj.length = 0;
      }
    }

    async function initMap() {

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
      map.mapTypes.set('nepate', mapType);
      map.setMapTypeId('nepate');

      // get domain geo boundaries
      const { errors, data: geoDomain } = await client.models.GeoDomainBoundary.list({
        filter: {
            domain: {eq: domain}
        } 
      });
      if (errors || geoDomain.length == 0) {
        addMarker();
      } else {
        const {data: geoBoundaries } = await geoDomain[0].locations();
        for (const geoBoundary of geoBoundaries) {
        
        const cityCircle = new google.maps.Circle({
            strokeColor: "#9d1fff",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#9d1fff",
            fillOpacity: 0.35,
            map,
            center: geoBoundary.location,
            radius: geoBoundary.radius * 1000,
        });
      }

      addMarker();
      }
    }
  }

  export function moveUserMarker(userId, location) {
        const movedUser = userIds.find(user => userId == user['id']);
        movedUser['marker'].setPosition({ lat: location.latitude, lng: location.longitude });
        alert('user moved on map');
  }


import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { Geolocation, ClearWatchOptions } from '@capacitor/geolocation';
import { getUrl } from "aws-amplify/storage";
import { getUserProfilePhoto } from '../library/user'

const client = generateClient<Schema>();
declare var google: any;
var markerIdsMap: any[] = [];
var subUsersWatch: any;
var subDronesWatch: any;

export async function createMap(userIds:string[], domain:string, centerCords) {
    let map;
    var InforObj = [];

    initMap();

    async function addMarker() {
      var filter;

      // map drones
      const {errors, data: drones } = await client.models.Drone.list();
      filter = {
          or: drones.map(({id}) => ({ id: { eq: id } }))
      };

      for (const drone of drones) {
        if (!drone.location)
          continue;

        var contentString = '<div id="content"><h1>' + drone.name +
          '</h1></div>';
        const icon = {
          url: '../../assets/images/uss_drone.png',
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };

        const marker = new google.maps.Marker({
          position: {lat: drone.location.lat, lng: drone.location.lng},
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

        markerIdsMap.push({id: drone.id, marker: marker});
      }

      // watch all the drone updates to reset location
      if (drones.length > 0) {
        subDronesWatch = client.models.Drone.onUpdate({ filter })
        .subscribe({
          next: (data) => {
            moveMarker(data.id, data.location);
          }
        });
      }

      // mark users
        filter = {
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
                const marker = new google.maps.Marker({
                position: { lat: user.location.lat, lng: user.location.lng },
                map: map,
                animation: google.maps.Animation.DROP,
                icon: userIcon,
                });

                const infowindow = new google.maps.InfoWindow({
                  content: user.username,
                  maxWidth: 200
                });
        
                marker.addListener('click', function () {
                  closeOtherInfo();
                  infowindow.open(marker.get('map'), marker);
                  InforObj[0] = infowindow;
                });
        
                markerIdsMap.push({id: user.id, marker: marker});
            });
         }
        // watch all the user updates to reset location
        if (users.length > 0) {
          subUsersWatch = client.models.User.onUpdate({ filter })
          .subscribe({
            next: (data) => {
              moveMarker(data.id, data.location);
            }
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

  export function disposeMap() {
    if (subUsersWatch)
      subUsersWatch.unsubscribe();
    markerIdsMap = [];
  }

  export function moveMarker(markerId, location) {
    const movedObj = markerIdsMap.find(({id}) => id == markerId);
    if (movedObj) {
      movedObj['marker'].setPosition({ lat: location.lat, lng: location.lng });
    }
  }


import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { Geolocation, ClearWatchOptions } from '@capacitor/geolocation';
import { getUrl } from "aws-amplify/storage";

const client = generateClient<Schema>();

let watchId: any = null;
let coordinates: any = null;

export async function setUserLocation(userId: string, callback) {
    const loc = await Geolocation.getCurrentPosition();
    coordinates = loc.coords;

    const {errors, data: updateUser } = await client.models.User.update({
        id: userId,
        location: {lat: coordinates.latitude, lng: coordinates.longitude}
      });
    callback(coordinates);
}

export async function watchUserLocationUpdate(userId: string, zone, callback) {
  var options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  };

  watchId = Geolocation.watchPosition(options, (position, err) => {
    zone.runGuarded(() => {
      if (!err) {
        // look for distance greater than 10 meters to update user
        const kmDist = distanceInKmBetweenEarthCoordinates(
          coordinates.latitude, coordinates.longitude,
          position.coords.latitude, position.coords.longitude
        );

        if (kmDist > 0.02) {
          coordinates = position.coords;
          client.models.User.update({
            id: userId,
            location: {lat: coordinates.latitude, lng: coordinates.longitude}
          });
          callback(coordinates);
        }
      }
    });
  });
}

export async function watchUserLocationCancel() {
  const opt: ClearWatchOptions = {id: watchId};
  Geolocation.clearWatch(opt).then(result=>{
    ;
  });
}

export async function getUserProfilePhoto(userId, callback) {
  const result = await getUrl({path: "profile-pictures/" + userId + ".png"});
  const testURLReq = await fetch(result.url);
  if (testURLReq.status != 404) {
    callback(result.url.toString());
  }
  else {
    // user does not have a valid photo, so substitute and avatar
    callback('../assets/icon/avatar.png');
  }
}


function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}
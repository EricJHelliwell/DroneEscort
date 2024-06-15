import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

import { uploadData } from "aws-amplify/storage";
import { signOut } from 'aws-amplify/auth';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-tab5',
  templateUrl: 'profile-detail.page.html',
  styleUrls: ['profile-detail.page.scss']
})
export class ProfileDetailPage {
  photo: SafeResourceUrl;
  photos = [
    'https://images.unsplash.com/photo-1592486058517-36236ba247c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1588774069410-84ae30757c8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592431698394-e5ed80f2c0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592486058552-8d1dde97d1cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592452320159-21d39c1ffd80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592431690191-c74f7e004198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1587613990444-68fe88ee970a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
  ];
  user: any;
  isDescModalOpen = false;

  constructor(private sanitizer: DomSanitizer, private alertCtl: AlertController
    , private authService: AuthGuardService) {
      this.user = this.authService.userDatabase();
      console.log(this.user);
    }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.photo = image.webPath;

    // Can be set to the src of an image now
    let blob = await fetch(image.webPath).then(r => r.blob());
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob);
  
    fileReader.onload = async (event) => {
      console.log("Complete File read successfully!", event.target.result);
      try {
        await uploadData({
              data: event.target.result, 
              path: "profile-pictures/" + this.user.username + ".png"
          });
      } catch (e) {
        console.log("error", e);
      }
    };

   // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async setDescription(newDesc) {
    const {data: userConvUpdate} = await client.models.User.update({
      id: this.user.id,
      description: newDesc.value
    })
    this.isDescModalOpen = false;
  }

  onLogout()
  {
    this.alertCtl.create({
      header: 'Are you sure?',
      message: 'Do you want to Logout?'
      , buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            signOut();
            document.location.replace('/login');
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}

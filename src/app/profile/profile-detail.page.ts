import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-tab5',
  templateUrl: 'profile-detail.page.html',
  styleUrls: ['profile-detail.page.scss']
})
export class ProfileDetailPage {
  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private alertCtl: AlertController) {}

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

   // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
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

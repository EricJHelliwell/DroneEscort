import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab5',
  templateUrl: 'profile-detail.page.html',
  styleUrls: ['profile-detail.page.scss']
})
export class ProfileDetailPage {
  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  async takePicture() {
 
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

}

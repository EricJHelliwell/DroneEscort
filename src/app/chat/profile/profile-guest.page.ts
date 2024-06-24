import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { uploadData, getUrl } from "aws-amplify/storage";
import { signOut } from 'aws-amplify/auth';
import { AuthGuardService } from '../../auth/auth-route-guard.service'
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { getUser, getUserProfilePhoto } from '../../library/user';

const client = generateClient<Schema>();

@Component({
  selector: 'app-active-profile',
  templateUrl: 'profile-guest.page.html',
  styleUrls: ['profile-guest.page.scss']
})
export class ProfileActiveDetailPage implements OnInit {
  photo: SafeResourceUrl;
  user: any;
  userIdArg: string;

  constructor(private sanitizer: DomSanitizer, private alertCtl: AlertController
    , private authService: AuthGuardService, private activatedRoute: ActivatedRoute
    , public router: Router, private navCtrl: NavController)
    {

    }

    async ngOnInit() {
      }

   async ionViewDidEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('userId')) {
        // redirect
        this.userIdArg = paramMap.get('userId');
      }
    });
    if (this.userIdArg) {
        getUser(this.userIdArg, (result) => {
          this.user = result;
        });
    }
    else {
      this.user = this.authService.userDatabase();
    }
    getUserProfilePhoto(this.user.id, (url) => {
      this.photo = url;
    });
    console.log(this.user);
  }

  goToBack() {
    this.navCtrl.back();
  }
}

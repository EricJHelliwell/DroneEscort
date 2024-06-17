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
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (paramMap.has('userId')) {
          // redirect
          this.userIdArg = paramMap.get('userId');
        }
      });
    }

    async ngOnInit() {
      }

   async ionViewDidEnter() {
    console.log('ionViewDidEnter');
    if (this.userIdArg)
      {
        const {errors, data: userProf } = await client.models.User.get ({
          id: this.userIdArg,
        });
        if (!errors) {
          console.log(userProf);
          this.user = userProf;
        }
      }
    else {
      this.user = this.authService.userDatabase();
    }

    const result = await getUrl({path: "profile-pictures/" + this.user.id + ".png"});
    fetch(result.url)
    .then((response) => {
      if (response.status != 404)
        this.photo = result.url; 
    });
  }

  goToBack() {
    this.navCtrl.back();
  }
}

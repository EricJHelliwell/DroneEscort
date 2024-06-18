import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-drones-detail',
  templateUrl: 'drones.detail.page.html',
  styleUrls: ['drones.detail.page.scss'],
})
export class DronesDetailPage implements OnInit {
  @ViewChild('name') private droneName: any;
  @ViewChild('desc') private droneDesc: any;
  @ViewChild('active') private droneActive: any;

  droneId: string;

  constructor(private activatedRoute: ActivatedRoute
    , private navCtrl: NavController) { 
  }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    if (paramMap.has('droneId')) {
      // redirect
      this.droneId = paramMap.get('droneId');
    }
  });

  if (this.droneId) {
    const {errors, data: drone } = await client.models.Drone.get ({
      id: this.droneId,
    });

    if (errors) return;
    this.droneDesc.value = drone.description;
    this.droneName.value = drone.name;
    this.droneActive.checked = drone.active;
  }
}

   async onSaveDrone() {
    if (this.droneId) {
      const {errors, data: drone } = await client.models.Drone.update ({
        id: this.droneId,
        description: this.droneDesc.value,
        name: this.droneName.value,
        active: this.droneActive.checked
      });
      if (errors) alert('Issue with updating.  Try later.');
      else this.goToBack();
    }
    else {
      const {errors, data: drone } = await client.models.Drone.create ({
        description: this.droneDesc.value,
        name: this.droneName.value,
        active: this.droneActive.checked
      });
      if (errors) alert('Issue with creating.  Try later.');
      else this.goToBack();
    }
   }

   
  goToBack() {
    this.navCtrl.back();
  }
}

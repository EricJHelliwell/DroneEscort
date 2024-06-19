import { Component, OnInit } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { handler } from '../../../amplify/auth/post-confirmation/handler';

const client = generateClient<Schema>();

@Component({
  selector: 'app-drones',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {
  drones: any;
  selectedDrone: string;
  segmentTab: any;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        return true;
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        return true;
      },
    },
  ];  

  constructor() { }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
    const {errors, data: drones } = await client.models.Drone.list();
    this.drones = drones;
  }

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
    console.log(this.segmentTab);
  }

  async onAddDrone() {
    const now = new Date();
    for (let i=1; i<5; i++){
      const droneName = "Drone " + i;
      const {errors, data: drone } = await client.models.Drone.create({
        name: droneName,
        createdAt: now.toISOString(),
        active: true,
        description: "latest drone",
      });
    }
  }

  
  async onDeleteDismiss(ev) {
    if (ev.detail.role == "confirm") {
      const {errors, data: drone } = await client.models.Drone.delete({
        id: this.selectedDrone,
      });
      if (errors)
        {
          alert('There was an issue deleting the drone')
        }
        const {data: drones } = await client.models.Drone.list();
        this.drones = drones;
    }
  }

}

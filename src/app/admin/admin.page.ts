import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  domains: any;
  selectedItem: string;
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

  constructor(private router: Router) { }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
    const {errors, data: drones } = await client.models.Drone.list();
    this.drones = drones;
    const {data: domains } = await client.models.GeoDomainBoundary.list();
    this.domains = domains;
  }

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
    console.log(this.segmentTab);
  }

  async onAddItem() {
    if (!this.segmentTab) alert('Please select a category'); 

    if (this.segmentTab == 'drone') {
      this.router.navigate(['/tabs/admin/drone']);
    }

    if (this.segmentTab == 'geo') {
      this.router.navigate(['/tabs/admin/drone']);
    }
  }

  
  async onDeleteDrone(ev) {
    if (ev.detail.role == "confirm") {
      const {errors, data: drone } = await client.models.Drone.delete({
        id: this.selectedItem,
      });
      if (errors)
        {
          alert('There was an issue deleting the drone')
        }
        const {data: drones } = await client.models.Drone.list();
        this.drones = drones;
    }
  }

  async onDeleteGeo(ev) {
    if (ev.detail.role == "confirm") {
      const {errors, data: drone } = await client.models.GeoDomainBoundary.delete({
        id: this.selectedItem,
      });
      if (errors)
        {
          alert('There was an issue deleting the domain')
        }
        const {data: drones } = await client.models.Drone.list();
        this.drones = drones;
    }
  }

}

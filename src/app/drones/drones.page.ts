import { Component, OnInit } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-drones',
  templateUrl: './drones.page.html',
  styleUrls: ['./drones.page.scss'],
})
export class DronesPage implements OnInit {
  drones: any;
  notifications = [
    {
      avatar: 'https://images.unsplash.com/photo-1556637641-0ac7101023f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Completed an escorted trip',
      date: new Date()
    },
    {
      avatar: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Completed an escorted trip',
      date:  new Date(2020, 6, 10)
    },
    {
      avatar: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Completed an escorted trip',
      date:  new Date(2020, 6, 1)
    },
    {
      avatar: 'https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Starbucks sent you an offer',
      date:  new Date(2020, 5, 25)
    },
    {
      avatar: 'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
      title: 'Completed an escorted trip',
      date:  new Date(2020, 4, 16)
    },
  ];

  constructor() { }

  async ngOnInit() {
    const {errors, data: drones } = await client.models.Drone.list();
    this.drones = drones;
    console.log(this.drones);
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
      console.log(errors);
      console.log(drone);
      }
  }
}

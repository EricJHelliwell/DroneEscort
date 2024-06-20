import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-geo-detail',
  templateUrl: 'geo.detail.page.html',
  styleUrls: ['geo.detail.page.scss'],
})
export class GeoBoundaryDetailPage implements OnInit {
  @ViewChild('domain') private geoDomain: any;
  @ViewChild('desc') private geoDesc: any;
  @ViewChild('active') private geoActive: any;
  locations: any[] = [];

  geoBoundaryId: string;
  isDescModalOpen = false;

  constructor(private activatedRoute: ActivatedRoute
    , private navCtrl: NavController) { 
  }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    if (paramMap.has('geoBoundaryId')) {
      // redirect
      this.geoBoundaryId = paramMap.get('geoBoundaryId');
    }
  });

  if (this.geoBoundaryId) {
    const {errors, data: geo } = await client.models.GeoDomainBoundary.get ({
      id: this.geoBoundaryId,
    });

    if (errors) return;
    this.geoDesc.value = geo.description;
    this.geoDomain.value = geo.domain;
    this.geoActive.checked = geo.active;

    const {data: locations } = await geo.locations();
    this.locations = locations;
  }
}

  async createDomainBoundary() {
    const {errors, data: geo } = await client.models.GeoDomainBoundary.create ({
      domain: this.geoDomain.value,
      description: this.geoDesc.value,
      active: this.geoActive.checked
    });
    if (errors) alert('Issue with updating.  Try later.');
    console.log(geo);
    // now create the locations
    for (const loc of this.locations) {
      const {data: locCreate } = await client.models.GeoBoundary.create ({
        domainId: geo.id,
        location: {lat: loc.location.lat, lng: loc.location.lng },
        radius: loc.radius
      });
    }
    if (errors) alert('Issue with creating.  Try later.');
    else this.goToBack();
  } 
  
  async onSaveGeoBoundary() {
    if (   !this.geoDomain 
        || this.geoDomain.value.length == 0
        || !this.geoDesc
        || this.geoDesc.value.length == 0
    ) return;

    if (this.geoBoundaryId) {
      const {errors, data: geo } = await client.models.GeoDomainBoundary.update ({
        id: this.geoBoundaryId,
        description: this.geoDesc.value,
        domain: this.geoDomain.value,
        active: this.geoActive.checked
      });
      
      if (errors) alert('Issue with updating.  Try later.');
      // delete old locations and add new ones
      else {
        const {data: locs } = await client.models.GeoBoundary.list ({
          filter: {
            domainId: {eq: this.geoBoundaryId }
          }
        });
        for (const loc of locs) {
          const {data: locDel } = await client.models.GeoBoundary.delete ({
            id: loc.id
          });
        }
        for (const loc of this.locations) {
          const {data: locCreate } = await client.models.GeoBoundary.create ({
            domainId: this.geoBoundaryId,
            location: {lat: loc.location.lat, lng: loc.location.lng },
            radius: loc.radius
          });
        }
      }
      this.goToBack();
    }
    // new instance
    else return this.createDomainBoundary();
   }

  onDeleteLocation(index) {
    this.locations.splice(index, 1);
   }

  onCreateLocation(lat, lng, radius) {
    this.locations.push({
      location:{ lat: lat.value, lng: lng.value},
      radius: radius.value
    });
    this.isDescModalOpen = false;
  }

  goToBack() {
    this.navCtrl.back();
  }
}

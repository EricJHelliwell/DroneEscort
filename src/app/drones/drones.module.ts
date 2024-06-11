import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DronesPageRoutingModule } from './drones-routing.module';

import { DronesPage } from './drones.page';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DronesPageRoutingModule,
    UtilsModule
  ],
  declarations: [DronesPage]
})
export class DronesPageModule {}

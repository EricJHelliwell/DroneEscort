import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { GeoBoundaryDetailPage } from './geo.detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: GeoBoundaryDetailPage }])
  ],
  declarations: [GeoBoundaryDetailPage]
})
export class GeoBoundaryDetailPageModule {}

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileActiveDetailPage } from './profile-guest.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProfileActiveDetailPage }])
  ],
  declarations: [ProfileActiveDetailPage]
})
export class ProfileActivePageModule {}

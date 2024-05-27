import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsTwoPageRoutingModule } from './notifications-two-routing.module';

import { NotificationsTwoPage } from './notifications-two.page';
import { UtilsModule } from 'src/app/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsTwoPageRoutingModule,
    UtilsModule
  ],
  declarations: [NotificationsTwoPage]
})
export class NotificationsTwoPageModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';
import { InboxPage } from './inbox.page';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule,
    UtilsModule
  ],
  declarations: [InboxPage]
})
export class InboxPageModule { }

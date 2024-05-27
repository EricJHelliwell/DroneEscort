import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsTwoPage } from './notifications-two.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsTwoPageRoutingModule {}

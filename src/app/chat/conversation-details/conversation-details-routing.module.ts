import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationDetailPage } from './conversation-details';

const routes: Routes = [
  {
    path: '',
    component: ConversationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationDetailPageRoutingModule {}


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsTabPage } from './chats.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsPageRoutingModule { }

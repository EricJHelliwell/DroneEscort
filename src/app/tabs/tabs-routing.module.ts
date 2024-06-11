import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'order',
        loadChildren: () => import('../order/maps.module').then(m => m.MapsPageModule)
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat/inbox.module').then(m => m.InboxPageModule)
          },
          {
            path: ':messages',
            loadChildren: () => import('../chat/messages/messages.module').then( m => m.MessagesPageModule)
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile-detail.module').then( m => m.ProfileDetailPageModule)
      },      
      {
        path: 'drones',
        loadChildren: () =>
          import('../drones/drones.module').then(m => m.DronesPageModule)
      },      
      {
        path: '',
        redirectTo: '/tabs/order',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

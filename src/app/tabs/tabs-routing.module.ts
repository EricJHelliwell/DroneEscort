import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../tab1/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../tab2/maps.module').then(m => m.MapsPageModule)
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/inbox.module').then(m => m.InboxPageModule)
          },
          {
            path: ':messages',
            loadChildren: () => import('../tab3/messages/messages.module').then( m => m.MessagesPageModule)
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('../tab4/profile-detail.module').then( m => m.ProfileDetailPageModule)
      },      
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

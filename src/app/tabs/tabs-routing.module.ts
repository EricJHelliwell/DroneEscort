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
        loadChildren: () => import('../tab1/notifications-two.module').then(m => m.NotificationsTwoPageModule)
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
        path: 'receipt',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

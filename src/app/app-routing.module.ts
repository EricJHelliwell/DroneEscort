import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuardService } from '../app/auth/auth-route-guard.service';
import { Injectable, inject } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [(next: ActivatedRouteSnapshot) => inject(AuthGuardService).canActivate(next)],
  },
  {
    path: 'message',
    children: [
      {
        path: ':conversationId',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule),
        canActivate: [(next: ActivatedRouteSnapshot) => inject(AuthGuardService).canActivate(next)],
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  }];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

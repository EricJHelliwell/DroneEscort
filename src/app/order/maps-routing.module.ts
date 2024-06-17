
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { OrderRouteGuard } from './order-guard';
import { Injectable, inject } from '@angular/core';

import { MapsPage } from './maps.page';

const routes: Routes = [
  {
    path: '',
    component: MapsPage,
    canDeactivate: [(next: ActivatedRouteSnapshot) => inject(OrderRouteGuard).canDeactivate(next)],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsPageRoutingModule { }

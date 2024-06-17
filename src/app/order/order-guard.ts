import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { isOrderActive } from '../library/order'

@Injectable()
export class OrderRouteGuard {

    constructor() {}

    public canDeactivate(route: ActivatedRouteSnapshot) {
        console.log('canDeActivate');
        return !isOrderActive();
    }
 }

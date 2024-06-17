import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { isOrderActive } from '../library/order'

@Injectable()
export class OrderRouteGuard {

    constructor() {}

    public canDeactivate(route: ActivatedRouteSnapshot) {
        if (isOrderActive()) {
            alert('You must cancel or wait for the order to leave the page');
        }
        return !isOrderActive();
    }
 }

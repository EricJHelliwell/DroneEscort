import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonApp, IonRouterOutlet} from "@ionic/angular";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from '../app/auth/auth-route-guard.service';
import { OrderRouteGuard } from '../app/order/order-guard'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), IonicModule, AppRoutingModule, RouterOutlet, IonicModule.forRoot({})],
  providers: [AuthGuardService, OrderRouteGuard, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

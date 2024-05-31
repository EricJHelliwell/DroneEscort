import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonApp, IonRouterOutlet, provideIonicAngular } from "@ionic/angular/standalone";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from '../app/auth/auth-route-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), IonicModule, AppRoutingModule, RouterOutlet, IonicModule.forRoot({})],
  providers: [AuthGuardService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideIonicAngular({})],
  bootstrap: [AppComponent],
})
export class AppModule {}

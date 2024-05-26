import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot  } from '@angular/router';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';


@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn = false;

  constructor(public router: Router) {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          console.log('user have been signedIn successfully.');
          this.isLoggedIn = true;
          break;
        case 'signedOut':
          console.log('user have been signedOut successfully.');
          this.isLoggedIn = false;
          break;
        case 'tokenRefresh':
          console.log('auth tokens have been refreshed.');
          break;
        case 'tokenRefresh_failure':
          console.log('failure while refreshing auth tokens.');
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
          break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          break;
      }
    });
    getCurrentUser()
    .then((users) => {
      this.isLoggedIn = true;
      console.log('Logged On');
      if (this.isLoggedIn && window.location.href.includes('login')) {
        this.router.navigate(['/tabs/tab1']);
        }
      })
    .catch(err => {
      this.isLoggedIn = false;
      console.log('Logged Off');
      this.router.navigate(['/login']);
  });
  }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    if (this.isLoggedIn == false)
      this.router.navigate(['/login']);
    return this.isLoggedIn == true;
    };
  
  }


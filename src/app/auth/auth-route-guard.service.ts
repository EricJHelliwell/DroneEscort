import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot  } from '@angular/router';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

@Injectable()
export class AuthGuardService {
  isLoggedIn = false;

  constructor(public router: Router) {
    getCurrentUser()
    .then((users) => {
      this.isLoggedIn = true;
      if (this.isLoggedIn && window.location.href.includes('login')) {
        this.router.navigate(['/tabs/home']);
        }
      })
    .catch(err => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
  });
  } 
}

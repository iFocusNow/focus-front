import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const isLoggedIn = email && password;

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to the login route if not logged in
      return false;
    }
  }
}

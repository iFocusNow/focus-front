import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check for the presence of session variables (e.g., email and password)
    const hasSessionVariables =
      localStorage.getItem('email') && localStorage.getItem('password');

    if (hasSessionVariables) {
      this.router.navigate(['/home']); // Redirect to home or any other desired route
      return false; // Block access to the login and register routes
    }

    return true; // Allow access to the login and register routes
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      return true;
    } else {
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}

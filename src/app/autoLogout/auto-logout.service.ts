import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  private timeout: any;
  private readonly AUTO_LOGOUT_TIME = 10 * 60 * 1000; // 1 minute
  private listenersInitialized = false;

  constructor(private router: Router, private ngZone: NgZone) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        const isAdminRoute = currentUrl.startsWith('/admin');
        const isLoginPage = currentUrl === '/login';
        const hasToken = !!sessionStorage.getItem('jwtToken');

        // If on login page or not in admin route, clear timer and remove listeners
        if (isLoginPage) {
          this.clearTimer();
          this.removeListeners();
          return;
        }

        if (!isAdminRoute) {
          this.clearTimer();
          this.removeListeners();
          return;
        }

        // In admin route with token: activate auto-logout logic
        if (isAdminRoute && hasToken) {
          if (!this.listenersInitialized) {
            this.initListeners();
            this.listenersInitialized = true;
          }
          this.resetTimer();
        }
      }
    });
  }

  private initListeners(): void {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event =>
      window.addEventListener(event, this.resetTimer.bind(this))
    );
  }

  private removeListeners(): void {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event =>
      window.removeEventListener(event, this.resetTimer.bind(this))
    );
    this.listenersInitialized = false;
  }

  private startTimer(): void {
    this.timeout = this.ngZone.runOutsideAngular(() =>
      setTimeout(() => {
        this.ngZone.run(() => this.logout());
      }, this.AUTO_LOGOUT_TIME)
    );
  }

  private resetTimer(): void {
    // Don't reset timer if on login page
    if (this.router.url === '/login') {
      return;
    }
    this.clearTimer();
    this.startTimer();
  }

  private clearTimer(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private logout(): void {
    debugger
    this.clearTimer();
   
      sessionStorage.clear();
      this.router.navigate(['/login']);
   
  }
}

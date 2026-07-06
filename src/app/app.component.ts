import { Component } from '@angular/core';
import { AutoLogoutService } from './autoLogout/auto-logout.service'; // Adjust path if different

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'car-rental-frontend';

  constructor(private autoLogoutService: AutoLogoutService) {
    // Just injecting it is enough to activate the logic
  }
}

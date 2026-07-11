import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingFormComponent } from 'src/app/pages/booking/booking-form/booking-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private modalService: NgbModal) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openBookingModal() {
    this.closeMenu();
    this.modalService.open(BookingFormComponent, { size: 'lg', centered: true, backdrop: 'static' });
  }
}

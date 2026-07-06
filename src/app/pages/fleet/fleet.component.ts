import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingFormComponent } from '../booking/booking-form/booking-form.component';
import { ApiService } from 'src/app/services/api.service';
import { StaticDataService } from 'src/app/services/static-data.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  AllCars: any[] = [];
  path: string = 'https://rirajtik-001-site1.ktempurl.com/api';
  BaseUrl: string = '';

  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private staticService: StaticDataService
  ) {}

  ngOnInit(): void {
    this.BaseUrl = this.path.replace(/^(.*:\/\/[^\/]+)\/.*/, '$1');
    //this.Getcar();
    this.AllCars = this.staticService.getAllCars();
    
  }

  steps = [
    { number: 1, iconClass: 'fas fa-car fa-3x text-warning', description: 'Choose your car' },
    { number: 2, iconClass: 'fas fa-file-alt fa-3x text-warning', description: 'Fill out the booking form' },
    { number: 3, iconClass: 'fas fa-check-circle fa-3x text-warning', description: 'Confirm your rental' },
    { number: 4, iconClass: 'fas fa-smile fa-3x text-warning', description: 'Enjoy your ride!' }
  ];

  isSmallScreen(): boolean {
    return window.innerWidth < 768;
  }

  // OnSubmit(): void {
  //   this.modalService.open(BookingFormComponent, {
  //     backdrop: 'static',
  //     windowClass: 'main_add_popup',
  //     keyboard: true,
  //     centered: true
  //   });
  // }

  onBookNow(car: any): void {
    debugger
    const carid = car.id // fallback to car.id if carId is not present
    const modalRef = this.modalService.open(BookingFormComponent, {
      backdrop: 'static',
      windowClass: 'main_add_popup',
      keyboard: true,
      centered: true
    });
    modalRef.componentInstance.carId = carid;
  }

//  Getcar() {
//   this.api.GetCars().subscribe({
//     next: (res: any) => {
//       this.AllCars = res?.data || [];

//       this.AllCars.forEach(car => {
//         if (car?.imagePath && car.imagePath !== 'null') {
//           const match = car.imagePath.match(/Uploads[\\/].*/);
//           const relativePath = match ? match[0].replace(/\\/g, '/') : '';
//           car.imagePath = `${this.BaseUrl}/${relativePath}`;
//         } else {
//           car.imagePath = 'assets/cars/default.jpg'; // fallback image
//         }
//       });
//     },
//     error: err => {
//       console.error('Failed to load cars:', err);
//     }
//   });
// }

openTariffDetails(car: any, template: TemplateRef<any>): void {
  this.modalService.open(template, {
    centered: true,
    size: 'lg'
  });
}   
}

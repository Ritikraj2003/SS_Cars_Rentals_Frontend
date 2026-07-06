import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarComponent } from './car/car.component';
import { BookingComponent } from './booking/booking.component';
import { DriverComponent } from './driver/driver.component';
import { ContactComponent } from './contact/contact.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AdminSidebarComponent } from '../shared/admin-sidebar/admin-sidebar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DriverEditAddComponent } from './driver/driver-edit-add/driver-edit-add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MasterBookingTypeComponent } from './master-booking-type/master-booking-type.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [
    DashboardComponent,
    CarComponent,
    BookingComponent,
    DriverComponent,
    ContactComponent,
    DriverEditAddComponent,
    MasterBookingTypeComponent 

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,FormsModule, 
    FontAwesomeModule,
    ChartModule 
    
  
  ]
})
export class AdminModule {



 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { FleetComponent } from './fleet/fleet.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    OurServicesComponent,
    ContactComponent,
    BookingComponent,
    AboutUsComponent,
    FleetComponent,
    BookingFormComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,RouterModule,ReactiveFormsModule 
  ]
})
export class PagesModule { }

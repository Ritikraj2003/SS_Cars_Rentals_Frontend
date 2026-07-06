import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AdminSidebarComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AdminSidebarComponent,
    AdminHeaderComponent
  ]
})
export class SharedModule { }

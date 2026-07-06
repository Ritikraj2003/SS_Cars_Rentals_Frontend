import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

export class AdminHeaderComponent  implements OnInit   {
  Name:any;
  currentDateTime: string = '';
  private timer: any;

constructor(private router: Router) {}

  ngOnInit(): void {
    this.Name=sessionStorage.getItem('Name');
    this.updateDateTime();
    this.timer = setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  AllCount: any = {};
  chart!: Chart;

  constructor(
    private api: ApiService,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.GetAllCount();
  }

  GetAllCount() {
    this.api.GetAllCount().subscribe({
      next: (res: any) => {
        this.AllCount = res;
        this.initChart(); 
      }
    });
  }

  initChart() {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325
      },
      title: {
        text: 'Booking Type'
      },
      series: [{
        type: 'pie',
        data: [
          {
            name: 'Company',
            y: this.AllCount?.bookingfor?.company || 0,
            color: '#044342',
          },
          {
            name: 'Individual',
            y: this.AllCount?.bookingfor?.indiviusal || 0,
            color: '#7e0505',
          }
        ]
      }],
      credits: {
        enabled: false
      }
    });
  }
}

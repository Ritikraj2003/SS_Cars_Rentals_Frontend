import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  slides = [
    'assets/cars/crysta.jpg',
    'assets/cars/jaguar.jpg',
    'assets/cars/dzire.png'
  
  ];
  
  currentSlide = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000); // 4 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
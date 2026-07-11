import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class OurServicesComponent implements OnInit, OnDestroy {
  safetySlides: string[] = [
    'assets/cars/safety1.png',
    'assets/cars/safety2.png',
    'assets/cars/safety3.png'
  ];
  currentSafetySlide = 0;
  safetyInterval: any;

  ngOnInit() {
    this.safetyInterval = setInterval(() => {
      this.nextSafetySlide();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.safetyInterval) {
      clearInterval(this.safetyInterval);
    }
  }

  nextSafetySlide() {
    this.currentSafetySlide = (this.currentSafetySlide + 1) % this.safetySlides.length;
  }

  prevSafetySlide() {
    this.currentSafetySlide = (this.currentSafetySlide - 1 + this.safetySlides.length) % this.safetySlides.length;
  }
  services = [
    {
      icon: 'fas fa-car',
      title: 'Wide Range of Vehicles',
      description: 'From compact cars to SUVs and luxury sedans, we have a car for every journey.',
      color: '#0d6efd' // blue
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Fully Insured Vehicles',
      description: 'Every rental is backed with full insurance and safety compliance for your protection.',
      color: '#198754' // green
    },
    {
      icon: 'fas fa-money-bill-wave',
      title: 'Affordable Rates',
      description: 'Transparent pricing with daily, weekly, and monthly packages at competitive rates.',
      color: '#6f42c1' // purple
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Customer Support',
      description: 'Our support team is available around the clock to assist you with anything.',
      color: '#dc3545' // red
    },
    {
      icon: 'fas fa-gas-pump',
      title: 'Fuel-Efficient Options',
      description: 'Save on fuel costs with our wide range of economy and hybrid vehicle options.',
      color: '#fd7e14' // orange
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'GPS Navigation',
      description: 'Many vehicles are equipped with built-in GPS to help you find your way easily.',
      color: '#20c997' // teal
    },
    {
      icon: 'fas fa-tools',
      title: 'Regular Maintenance',
      description: 'Each vehicle undergoes routine checks and professional servicing for top performance.',
      color: '#d63384' // pink
    },
    {
      icon: 'fas fa-clock',
      title: 'Flexible Rental Durations',
      description: 'Book for hours, days, or months—our flexible plans adapt to your schedule.',
      color: '#6610f2' // indigo
    }
  ];


}

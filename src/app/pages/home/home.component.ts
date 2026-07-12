import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  heroSlides = [
    'assets/cars/car_with_driver.png',
    'assets/cars/car_at_office.png',
    'assets/cars/scenic_car.png'
  ];
  currentHeroSlide = 0;
  heroInterval: any;

  currentFeedback = 0;
  feedbackInterval: any;
  feedbacks: any[] = [];
  defaultFeedback = {
    Name: 'Amit Sharma',
    Message: 'Great service! The car was clean and the process was smooth.',
    Photo: 'assets/cars/bmw1.avif',
    Date: new Date().toISOString()
  };

  // Milestone counters
  premiumVehicles = 0;
  kilometersDriven = 0;
  citiesCovered = 0;
  satisfactionRate = 0;

  @ViewChild('milestonesSection') milestonesSection!: ElementRef;
  private observer!: IntersectionObserver;
  private animationStarted = false;

  constructor(
    private http: HttpClient,
    private meta: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Best Car Service in Kolkata - SS Car Rentals');
    this.meta.updateTag({ name: 'description', content: 'Experience the best premium chauffeur service and corporate car rentals in Kolkata with SS Car Rentals. Luxury vehicles available for every journey.' });
    this.meta.updateTag({ name: 'keywords', content: 'best chauffeur service in kolkata, luxury car rental kolkata, corporate car rental, chauffeur-driven cars kolkata, premium cab service kolkata, long-term car rental kolkata, SS Car Rentals' });

    this.getExcelData();
    this.heroInterval = setInterval(() => {
      this.nextHeroSlide();
    }, 5000);
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.clearFeedbackRotation();
    if (this.heroInterval) clearInterval(this.heroInterval);
    if (this.observer) this.observer.disconnect();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.animationStarted) {
        this.animationStarted = true;
        this.startNumberAnimation();
      }
    }, { threshold: 0.3 });

    if (this.milestonesSection) {
      this.observer.observe(this.milestonesSection.nativeElement);
    }
  }

  private startNumberAnimation(): void {
    this.animateValue('premiumVehicles', 50, 2000);
    this.animateValue('kilometersDriven', 1000, 2000); // Animates 0-1000, shows as K+ and ends as 1M+
    this.animateValue('citiesCovered', 20, 2000);
    this.animateValue('satisfactionRate', 99, 2000);
  }

  private animateValue(prop: 'premiumVehicles' | 'kilometersDriven' | 'citiesCovered' | 'satisfactionRate', target: number, duration: number): void {
    const start = 0;
    // Calculate increment per 16ms frame (~60fps)
    const increment = target / (duration / 16);
    let current = start;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        this[prop] = target;
        clearInterval(interval);
      } else {
        this[prop] = Math.floor(current);
      }
    }, 16);
  }

  nextHeroSlide() {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
  }

  prevHeroSlide() {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  getExcelData() {
    const url = 'https://script.google.com/macros/s/AKfycbwqvDoiHdj2nnzo1U1Hf3sByb7TdTfet0_mJ6qalfeqAb3JGDKzAwzZaneTQuRMxrqz/exec';

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.feedbacks = Array.isArray(res) ? res : [];
        this.currentFeedback = 0;
        this.startFeedbackRotation();
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  get currentFeedbackData() {
    if (this.feedbacks.length) {
      return {
        ...this.defaultFeedback,
        ...this.feedbacks[this.currentFeedback]
      };
    }
    return this.defaultFeedback;
  }

  private startFeedbackRotation(): void {
    this.clearFeedbackRotation();
    if (this.feedbacks.length <= 1) {
      return;
    }
    this.feedbackInterval = setInterval(() => {
      this.currentFeedback = (this.currentFeedback + 1) % this.feedbacks.length;
    }, 4000);
  }

  private clearFeedbackRotation(): void {
    if (this.feedbackInterval) {
      clearInterval(this.feedbackInterval);
      this.feedbackInterval = null;
    }
  }

  faqs = [
    {
      question: 'What types of vehicles do you offer at SS Car Rentals?',
      answer: 'We offer a wide range of chauffeur-driven vehicles, including hatchbacks, sedans, SUVs, Toyota Innova Crysta, Tempo Travellers, and luxury cars such as Audi and Mercedes, to meet all your travel needs for the best car rental experience in Kolkata.',
      isOpen: true
    },
    {
      question: 'Do you provide local and outstation cab services in Kolkata?',
      answer: 'Yes, we provide comprehensive premium cab services in Kolkata, including local city travel, outstation trips, one-way journeys, round trips, airport transfers, and tailored corporate car rentals.',
      isOpen: false
    },
    {
      question: 'Are your drivers experienced and verified?',
      answer: 'Yes, all our chauffeurs are professionally trained, licensed, and background-verified to ensure a safe, comfortable, and reliable travel experience for every SS Car Rental customer.',
      isOpen: false
    },
    {
      question: 'How are your car rental fares calculated?',
      answer: 'Our transparent fares are based on the vehicle selected, travel distance, trip duration, and journey type. Any applicable tolls, parking fees, or state taxes will be clearly communicated at the time of booking your premium cab.',
      isOpen: false
    },
    {
      question: 'What should I do if my travel plans change?',
      answer: 'Please contact our SS Car Rentals support team as soon as possible. Whether it is an outstation trip or an airport transfer, we will do our best to accommodate your changes flexibly.',
      isOpen: false
    }
  ];

  toggleFaq(selectedIndex: number): void {
    this.faqs = this.faqs.map((faq, index) => ({
      ...faq,
      isOpen: index === selectedIndex ? !faq.isOpen : false
    }));
  }
}
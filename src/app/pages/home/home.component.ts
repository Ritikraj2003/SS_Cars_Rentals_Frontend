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
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Best Car Service in Kolkata - SS Car Rentals');
    this.meta.updateTag({ name: 'description', content: 'Experience the best car rental service in Kolkata with SS Car Rentals. Premium vehicles, self-drive, and corporate rentals available.' });
    this.meta.updateTag({ name: 'keywords', content: 'best car service in kolkata, car rental kolkata, corporate car rental, self drive cars kolkata' });

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
      question: 'What types of vehicles are available for rent?',
      answer: 'We offer a diverse fleet including hatchbacks for city driving, sedans for business trips, SUVs for family vacations, and luxury cars for special occasions.',
      isOpen: true
    },
    {
      question: 'Are there any mileage limits on my rental?',
      answer: 'Our rentals come with transparent mileage policies. We offer unlimited kilometers on select packages, while others have a generous daily limit. Please check your specific package details during booking.',
      isOpen: false
    },
    {
      question: 'What is included in the rental price?',
      answer: 'The rental price includes the vehicle, standard insurance, and GST. Additional charges may apply for tolls, interstate permits, and driver allowances for outstation trips.',
      isOpen: false
    },
    {
      question: 'Can I modify or cancel my booking?',
      answer: 'Yes, you can easily modify or cancel your booking through our website or by calling our 24/7 customer support. Cancellations made 24 hours prior to pickup are usually free of charge.',
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
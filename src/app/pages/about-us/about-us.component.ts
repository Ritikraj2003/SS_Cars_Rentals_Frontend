import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AboutUsComponent implements OnInit {

  constructor(private meta: Meta, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('About Us - SS Car Rentals Kolkata');
    this.meta.updateTag({ name: 'description', content: 'Learn more about SS Car Rentals, our mission, vision, and the leadership driving the best premium chauffeur service in Kolkata.' });
    this.meta.updateTag({ name: 'keywords', content: 'best chauffeur service in kolkata, luxury car rental kolkata, corporate car rental, chauffeur-driven cars kolkata, premium cab service kolkata, long-term car rental kolkata, SS Car Rentals' });
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

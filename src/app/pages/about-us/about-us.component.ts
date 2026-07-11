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

  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('About Us - SS Car Rentals Kolkata');
    this.meta.updateTag({ name: 'description', content: 'Learn more about SS Car Rentals, our mission, vision, and the leadership driving the best car rental experience in Kolkata.' });
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

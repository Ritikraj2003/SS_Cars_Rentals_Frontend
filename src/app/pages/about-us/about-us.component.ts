import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class AboutUsComponent {
  faqs = [
    {
      question: 'What types of vehicles do you offer?',
      answer: 'We offer hatchbacks, sedans, SUVs, and luxury cars.',
      isOpen: true
    },
    {
      question: 'How do I book a car?',
      answer: 'You can book through our website or by contacting us.',
      isOpen: false
    },
    {
      question: 'Do you provide chauffeur services?',
      answer: 'Yes, we offer chauffeur services upon request.',
      isOpen: false
    },
    {
      question: 'Are your rentals available 24/7?',
      answer: 'Yes, our services are available around the clock.',
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

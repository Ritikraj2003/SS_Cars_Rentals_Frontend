import { Component } from '@angular/core';
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
export class OurServicesComponent {
  services = [
    {
      icon: 'fas fa-car',
      title: 'Wide Range of Vehicles',
      description: 'From compact cars to SUVs and luxury sedans, we have a car for every journey.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Fully Insured Vehicles',
      description: 'Every rental is backed with full insurance and safety compliance for your protection.'
    },
    {
      icon: 'fas fa-money-bill-wave',
      title: 'Affordable Rates',
      description: 'Transparent pricing with daily, weekly, and monthly packages at competitive rates.'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Customer Support',
      description: 'Our support team is available around the clock to assist you with anything.'
    },
    {
      icon: 'fas fa-gas-pump',
      title: 'Fuel-Efficient Options',
      description: 'Save on fuel costs with our wide range of economy and hybrid vehicle options.'
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'GPS Navigation',
      description: 'Many vehicles are equipped with built-in GPS to help you find your way easily.'
    },
    {
      icon: 'fas fa-tools',
      title: 'Regular Maintenance',
      description: 'Each vehicle undergoes routine checks and professional servicing for top performance.'
    },
    {
      icon: 'fas fa-clock',
      title: 'Flexible Rental Durations',
      description: 'Book for hours, days, or months—our flexible plans adapt to your schedule.'
    }
  ];

  tariffRates = [
    {
      vehicleType: 'Sedan Type Taxi',
      note: '(Aspire, Dzire, Etios, Xcent & Zest)',
      dropRate: 'Rs. 14',
      roundRate: 'Rs. 12'
    },
    {
      vehicleType: 'MUV Type Taxi',
      note: '(Xylo, Ertiga, Marazzo, Lodgy)',
      dropRate: 'Rs. 18',
      roundRate: 'Rs. 16'
    },
    {
      vehicleType: 'MUV Type Taxi',
      note: '(Innova)',
      dropRate: 'Rs. 19',
      roundRate: 'Rs. 16'
    }
  ];

  tariffTerms = [
    '<b>Rates given above are inclusive of GST.</b>',
    '<b>Drop Trips</b> - Driver Batta Rs. 400. [Rs. 600 for above 400 kms] - Waiting Charges Rs. 150 per hour.',
    '<b>Drop Trips</b> - Minimum running must be 100 Kms.',
    '<b>Round Trips</b> - Driver batta is Rs. 500/- per day.',
    '<b>Round Trips</b> - Driver batta is Rs. 600/- per day if the distance travelled is more than 500kms in a single day.',
    '<b>Round Trips</b> - Minimum running must be 250 Kms per day. For Karnataka it is minimum 300 Kms per day.',
    '<b>Round Trips</b> - 1 day means 1 calender day (from 00:00 hrs to 23:59 hrs)',
    '<b>Hill station charges</b> - Rs.300 for sedan Rs.500 for MUV.',
    'Washing Charges for carrying Pet Rs.400 for Sedan & Rs.500 for MUV.',
    'Luggage charges Rs.300 <a href="#" class="tariff-link">luggage policy page</a>.',
    'Only 2 (Pickup & drop) points are allowed. More than that charges will be applicable.',
    '<a href="#" class="tariff-link">Toll fees, Inter-State Permit charges (if any)</a> are extra.'
  ];

  localPackages = [
    { packageType: '2 hrs & 20 kms', sedan: 'Rs. 850', muv: 'Rs. 1200' },
    { packageType: '3 hrs & 30 kms', sedan: 'Rs. 1100', muv: 'Rs. 1550' },
    { packageType: '4 hrs & 40 kms', sedan: 'Rs. 1350', muv: 'Rs. 1900' },
    { packageType: '5 hrs & 50 kms', sedan: 'Rs. 1550', muv: 'Rs. 2150' },
    { packageType: '6 hrs & 60 kms', sedan: 'Rs. 1750', muv: 'Rs. 2400' },
    { packageType: '7 hrs & 70 kms', sedan: 'Rs. 2000', muv: 'Rs. 2750' },
    { packageType: '8 hrs & 80 kms', sedan: 'Rs. 2200', muv: 'Rs. 3000' },
    { packageType: '9 hrs & 90 kms', sedan: 'Rs. 2400', muv: 'Rs. 3250' },
    { packageType: '10 hrs & 100 kms', sedan: 'Rs. 2650', muv: 'Rs. 3600' },
    { packageType: '11 hrs & 110 kms', sedan: 'Rs. 2850', muv: 'Rs. 3850' },
    { packageType: '12 hrs & 120 kms', sedan: 'Rs. 3050', muv: 'Rs. 4100' },
    { packageType: '13 hrs & 130 kms', sedan: 'Rs. 3300', muv: 'Rs. 4450' },
    { packageType: '14 hrs & 140 kms', sedan: 'Rs. 3600', muv: 'Rs. 4800' },
    { packageType: '15 hrs & 150 kms', sedan: 'Rs. 3900', muv: 'Rs. 5100' },
    { packageType: 'Additional Hrs', sedan: 'Rs. 200/hr', muv: 'Rs. 250/hr' },
    { packageType: 'Additional KMs', sedan: 'Rs. 20/km', muv: 'Rs. 25/km' }
  ];

  outstationPackages = [
    { packageType: 'Half Day<br><span class="outstation-note">(6 hrs & 90 kms)</span>', sedan: 'Rs. 2100', muv: 'Rs. 3000' },
    { packageType: 'Full Day<br><span class="outstation-note">(10 hrs & 180 kms)</span>', sedan: 'Rs. 3100', muv: 'Rs. 4000' },
    { packageType: 'Additional Hrs', sedan: 'Rs. 150 / hr', muv: 'Rs. 150 / hr' },
    { packageType: 'Additional KMs', sedan: 'Rs. 12 / km', muv: 'Rs. 16 / km' }
  ];
  outstationNote = 'Toll fees, Inter-State Permit charges (if any) are extra.';

  tempoTraveller = [
    { description: 'Rate', roundTrip: 'Rs. 26/km' },
    { description: 'Driver batta', roundTrip: 'Rs.800' }
  ];
  tempoTravellerNotes = [
    'Driver Batta will be Rs.800 if Km exceeds 600 in a same day.',
    'Toll, Inter-state permit and Parking if any are extra.',
    'For bookings please call or whatsapp to our number(+91-7999222000)'
  ];
}

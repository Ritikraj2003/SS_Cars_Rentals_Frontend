import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class BookingComponent implements OnInit, OnDestroy {
  bookingForm!: FormGroup;
  //AllCars:any
  AllCars: any[] = [];
  Bookingtypes:any[] = [];
  //bookingTypes = ['One Way', 'Round Trip'];
  //carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];
  // feedbacks = [
  //   {
  //     image: 'assets/cars/audi.png',
  //     name: 'Amit Sharma',
  //     text: 'Great service! The car was clean and the process was smooth.'
  //   },
  //   {
  //     image: 'assets/cars/bmw1.avif',
  //     name: 'Priya Singh',
  //     text: 'Very professional drivers and timely pickup. Highly recommended!'
  //   },
  //   {
  //     image: 'assets/cars/jaguar.jpg',
  //     name: 'Rahul Verma',
  //     text: 'Affordable prices and a wide range of cars to choose from.'
  //   }
  // ];
  currentFeedback = 0;
  feedbackInterval: any;
  feedbacks: any[] = [];
  defaultFeedback = {
    Name: 'Amit Sharma',
    Message: 'Great service! The car was clean and the process was smooth.',
    Photo: 'assets/cars/bmw1.avif',
    Date: new Date().toISOString()
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private viewportScroller: ViewportScroller
    
   
  ) {}

  ngOnInit(): void {
    // Ensure the page is at the top whenever this route loads or refreshes
    this.viewportScroller.scrollToPosition([0, 0]);

    this.getExcelData();
    this.bookingForm = this.fb.group({
      cartype: ['', Validators.required],
      BookingType: ['', Validators.required],
      Phone_no: ['', Validators.required, ],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PickupLocation: ['', Validators.required],
      PickupDate: ['', Validators.required],
      PickupTime: ['', Validators.required],
      DropLocation: ['', Validators.required],
      Dropdate: ['', Validators.required],
      Droptime: ['', Validators.required],
      BookingDate: ['', Validators.required],
      CompanyEnabled: [false],
      CompanyName: [''],
      CompanyDescription: ['']
    });
    

    this.AllCars = [
      { carName: "innova", carModel: "Toyota Innova" },
      { carName: "honda_city", carModel: "Honda City" },
      { carName: "ertiga", carModel: "Suzuki Ertiga" },
      { carName: "xuv500", carModel: "Mahindra XUV500" }
    ];

    this.Bookingtypes = [
      { type: "One Way" },
      { type: "Round Trip" }
    ];

    this.bookingForm.get('CompanyEnabled')?.valueChanges.subscribe(enabled => {
      const nameControl = this.bookingForm.get('CompanyName');
      const descControl = this.bookingForm.get('CompanyDescription');
      if (enabled) {
        nameControl?.setValidators([Validators.required]);
        descControl?.setValidators([Validators.required]);
      } else {
        nameControl?.clearValidators();
        descControl?.clearValidators();
      }
      nameControl?.updateValueAndValidity();
      descControl?.updateValueAndValidity();
    });

     //this.BookingType()
    // this.Getcar();
    
  }

  ngOnDestroy(): void {
    this.clearFeedbackRotation();
  }

 
  

  // onSubmit(): void {
  //   debugger
  //   if (this.bookingForm.valid) {
  //     console.log('Booking Data:', this.bookingForm.value);
  //      const formDataRaw = this.bookingForm.value;

  //   const formData = new FormData();
  //   formData.append('Name', formDataRaw.Name);
  //   formData.append('Email', formDataRaw.Email);
  //   formData.append('cartype', formDataRaw.cartype);
  //    formData.append('Phone_no', formDataRaw.Phone_no);
  //   formData.append('BookingType', formDataRaw.BookingType);
  //   formData.append('PickupLocation', formDataRaw.PickupLocation);
  //   formData.append('PickupDate', formDataRaw.PickupDate);
  //   formData.append('PickupTime',  formDataRaw.PickupTime);
  //   formData.append('DropLocation', formDataRaw.DropLocation);
  //   formData.append('Dropdate',formDataRaw.Dropdate);
  //   formData.append('Droptime',  formDataRaw.Droptime);
  //   formData.append('BookingDate',formDataRaw.BookingDate);
  //   formData.append('CompanyEnabled', formDataRaw.CompanyEnabled);
  //   formData.append('CompanyName', formDataRaw.CompanyName);
  //   formData.append('CompanyDescription', formDataRaw.CompanyDescription);

  //     this.api.CreateBooking(formData).subscribe({next:(res:any)=>{
  //       console.log("Booking:",res)
  //         this.bookingForm.reset();
  //     }});
  //     // send to API
  //   }
  // }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formDataRaw = this.bookingForm.value;
  
      const data = {
        Car_Type: formDataRaw.cartype,
        Booking_Type: formDataRaw.BookingType,
        Booking_Date: formDataRaw.BookingDate,
        Phone_No: formDataRaw.Phone_no,
        Full_Name: formDataRaw.Name,
        Email: formDataRaw.Email,
        Pick_Up_location: formDataRaw.PickupLocation,
        Pick_Time: formDataRaw.PickupTime,
        Pick_Date: formDataRaw.PickupDate,
        Drop_location: formDataRaw.DropLocation,
        Drop_Time: formDataRaw.Droptime,
        Drop_Date: formDataRaw.Dropdate,
        CompanyName: formDataRaw.CompanyName,
        CompanyDescription: formDataRaw.CompanyDescription
      };
  
      console.log("Sending Data:", data);
  
      // Send to Google Apps Script
      fetch("https://script.google.com/macros/s/AKfycby5R9-LeGPhn9oRuiBvsa-6tXFc0rmEcAEjHkTETU2UMmuSi-quzcECSzhHn7L9Up0SAw/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      this.bookingForm.reset();
    }
  }
  


  
  Getcar(){
    debugger;
      this.api.GetCars().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        this.AllCars=res.data;
      }
    });
  }

  BookingType(){

     this.api.GetBookingType().subscribe({next: (res:any) => {
        console.log('Carstype:', res);
        this.Bookingtypes=res.data;
      }
    });
  }


  getExcelData() {
    const url = 'https://script.google.com/macros/s/AKfycbwqvDoiHdj2nnzo1U1Hf3sByb7TdTfet0_mJ6qalfeqAb3JGDKzAwzZaneTQuRMxrqz/exec'; // replace with your deployed Apps Script URL

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        console.log('Data from Google Sheet:', res);
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
}
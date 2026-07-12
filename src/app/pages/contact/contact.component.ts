import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
//import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  ContactForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private titleService: Title,
    private meta: Meta,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us - SS Car Rentals Kolkata');
    this.meta.updateTag({ name: 'description', content: 'Contact SS Car Rentals for premium chauffeur services, corporate fleet partnerships, and luxury car rentals in Kolkata.' });
    this.meta.updateTag({ name: 'keywords', content: 'contact SS Car Rentals, car rental customer service kolkata, corporate cab tie-ups kolkata, chauffeur service contact' });

    this.ContactForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      location: [''],
      city: [''],
      region: [''],
      postalCode: [''],
      country: [''],
      message: ['']
    });
  }

  // onSubmit() {
  //   debugger;
  //   console.log("Data",this.ContactForm.value)
  //     const form = this.ContactForm.value;

  //   const obj = {
  //     First: form.firstName,
  //     lastName: form.lastName,
  //     email: form.email,
  //     phone: form.phone,
  //     addresses: [
  //       {
  //         location: form.location,
  //         city: form.city,
  //         region: form.region,
  //         postalCode: form.postalCode,
  //         country: form.country
  //       }
  //     ],
  //     isDeleted: false
  //   };
  //   /////Temporary commented //////////
  //   //    this.api.CreateContact(obj).subscribe({
  //   //   next: (res) => {
  //   //     alert("Contact submitted successfully!");
  //   //     this.ContactForm.reset();
  //   //   }
  //   // });

  //    // send 'contact' as type to route in Apps Script (if needed)


  //   }


  onSubmit() {
    const form = this.ContactForm.value;

    const data = {
      FirstName: form.firstName,
      LastName: form.lastName,
      Email: form.email,
      Phone: form.phone,
      Location: form.location,
      City: form.city,
      Region: form.region,
      PostalCode: form.postalCode,
      Country: form.country,
      Message: form.message,
    };

    fetch("https://script.google.com/macros/s/AKfycbyVpF0sdlz4hczywk-pejFRb22xvnOmN-BtCvQ2u4TkAWieUBfYSutvVA9zfd0HPQrAhg/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(() => {
      this.ContactForm.reset();
      this.toastr.success('Submitted successfully!', 'Success');
    })
    .catch((error) => {
      console.error('Error!', error.message);
      this.toastr.error('Failed to submit, try again.', 'Error');
    });
  }

}


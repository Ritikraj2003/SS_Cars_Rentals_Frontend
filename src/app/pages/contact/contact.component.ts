import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
//import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  ContactForm:FormGroup =new FormGroup({});

  constructor(
     private formBuilder: FormBuilder,
     //private api :ApiService,
     private http: HttpClient
  )
  {}
    
  ngOnInit(): void {
    this.ContactForm=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phone:[''],
      location:[''],
      city:[''],
      region:[''],
      postalCode:[''],
      country:[''],
      message:['']
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

    fetch("https://script.google.com/macros/s/AKfycbxx1m8MmL6UJqj1lkKx07avrLa7njS4INSa7Km2cLxWOrto7gdoAxcO6qQpVyrw343P/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    this.ContactForm.reset();
    alert("Message sent successfully!");
  }
  
}


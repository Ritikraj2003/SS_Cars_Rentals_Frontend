import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const BASE_URL = environment.apiBaseUrl;
//const BASE_URL = 'https://localhost:7055/api';
//https://localhost:7055/api/Authentication

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // ------------------- AUTH -------------------
  login(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/Authentication/login`, data);
  }

  // Driver API=================================================

  CreateDriver(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/Driver`, data);
  }
  GetAllDriver(): Observable<any> {
    return this.http.get(`${BASE_URL}/Driver`);
  }
  DeleteDriverbyId(id: number): Observable<any> {
  return this.http.delete(`${BASE_URL}/Driver/${id}`);
   }
  EditdriverById(id:number,obj:any):Observable<any>{
   return this.http.put(`${BASE_URL}/Driver/${id}`,obj);
   }
 
// Contact API=================================================

  CreateContact(obj:any): Observable<any>{
    return this.http.post(`${BASE_URL}/Contanct`,obj)
   }
  GetAllContact():Observable<any>{
    return this.http.get(`${BASE_URL}/Contanct`);
  }
  contactDeleteById(id:number):Observable<any>{
    return this.http.delete(`${BASE_URL}/Contanct/${id}`)
  }


// car Type API=================================================

  GetCars(): Observable<any> {
    return this.http.get(`${BASE_URL}/Car`);
  }
  CreateCar(obj :any): Observable<any>{
    return this.http.post(`${BASE_URL}/Car`,obj)
  }

  carDeleteById(id:number):Observable<any>{
    return this.http.delete(`${BASE_URL}/Car/${id}`)
  }
  GetcarById(id:number): Observable<any>{
    return this.http.get(`${BASE_URL}/Car/${id}`)
  }
  
  UpdateCar(id: number, data: any) {
    return this.http.put(`${BASE_URL}/Car/${id}`, data);
  }

  //Booking_Type ================================================
  CreateBookingType(obj:any):Observable<any>{
    return this.http.post(`${BASE_URL}/BookingType`,obj)
  }
   GetBookingType(): Observable<any> {
    return this.http.get(`${BASE_URL}/BookingType`);
  }

  DeleteById(id:number):Observable<any>{
    return this.http.delete(`${BASE_URL}/BookingType/${id}`)
  }
  UpdateBookingType(id: number, data: any) {
  return this.http.put(`${BASE_URL}/BookingType/${id}`, data);
}



// Booking Api ====================================
CreateBooking(obj:any):Observable<any>{
  return this.http.post(`${BASE_URL}/Booking`,obj)
}
GetAllBooking():Observable<any>{
  return this.http.get(`${BASE_URL}/Booking`)
}
BookingDeleteById(id:number):Observable<any>{
  return this.http.delete(`${BASE_URL}/Booking/${id}`)
}
UpdateBookingById(id:number,obj:any):Observable<any>{
  return this.http.put(`${BASE_URL}/Booking/${id}`,obj)
}
//Dashboard count
   GetAllCount():Observable<any>{
     return this.http.get(`${BASE_URL}/Dashboard/total-count`)
   }











   //Google SheetApi///////////////////
  //  private scriptUrl =
  //  'https://script.google.com/macros/s/AKfycbzlLdyQJIn0MZT1T2g8peguTPtPEj0MpGkEGVqPerIPJK2BBt96qn4NyNNXii9N0SIB/exec';
 
  //  sendContactForm(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.scriptUrl, data, { headers });
  // }
 
  
  }

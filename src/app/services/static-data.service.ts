import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor() { }

  AllCars = [
    {
      id: 1,
      carName: 'innova_crysta',
      carModel: 'Toyota Innova Crysta',
      imagePath: 'assets/cars/innova.jpg'
    },
    {
      id: 2,
      carName: 'honda_city',
      carModel: 'Honda City ZX',
      imagePath: 'assets/cars/Honda city.jpg'
    },
    {
      id: 3,
      carName: 'maruti_ertiga',
      carModel: 'Maruti Suzuki Ertiga',
      imagePath: 'assets/cars/ertiga2.webp'
    },
    {
      id: 4,
      carName: 'mahindra_xuv500',
      carModel: 'Mahindra XUV500',
      imagePath: 'assets/cars/download.jpg'
    },
    {
      id: 5,
      carName: 'hyundai_verna',
      carModel: 'Hyundai Verna SX',
      imagePath: 'assets/cars/dzire.png'
    },
    {
      id: 6,
      carName: 'kia_seltos',
      carModel: 'Kia Seltos GTX',
      imagePath: 'assets/cars/crystaf.webp'
    },
    {
      id: 7,
      carName: 'mg_hector',
      carModel: 'MG Hector Sharp',
      imagePath: 'assets/cars/porsche.webp'
    },
    {
      id: 8,
      carName: 'toyota_etios',
      carModel: 'Toyota Etios',
      imagePath: 'assets/cars/toyotaetios.jpg'
    },
    {
      id: 9,
      carName: 'audi_a4',
      carModel: 'Audi A4',
      imagePath: 'assets/cars/audi.png'
    },
    {
      id: 10,
      carName: 'bmw_5_series',
      carModel: 'BMW 5 Series',
      imagePath: 'assets/cars/bmw1.avif'
    }
  ];

  // 👉 Get all cars
  getAllCars() {
    return this.AllCars;
  }

  // 👉 Get single car by ID
  getCarById(id: number) {
    return this.AllCars.find(x => x.id === id);
  }



  // -------------------- BOOKING TYPES --------------------
  AllBookingTypes = [
    { id: 1, bookingName: 'one_way', bookingModel: 'One Way Trip' },
    { id: 2, bookingName: 'round_trip', bookingModel: 'Round Trip' },
    { id: 3, bookingName: 'local', bookingModel: 'Local Booking' },
    { id: 4, bookingName: 'airport_drop', bookingModel: 'Airport Drop' },
    { id: 5, bookingName: 'airport_pickup', bookingModel: 'Airport Pickup' },
    { id: 6, bookingName: 'outstation', bookingModel: 'Outstation Ride' }
  ];

  getAllBookingTypes() {
    return this.AllBookingTypes;
  }

  getBookingTypeById(id: number) {
    return this.AllBookingTypes.find(x => x.id === id);
  }
}

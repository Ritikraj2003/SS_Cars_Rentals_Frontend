import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingFormComponent } from 'src/app/pages/booking/booking-form/booking-form.component';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  searchTerm = '';
  currentPage = 1;
  pageSize = environment.pageSize;
  Booking :any[]=[]
  viewData:any;

  constructor(
    private api:ApiService,
    private modalService: NgbModal
  ){}
   ngOnInit(): void {
    this.GetAllBooking();
  }

  get filteredData() {
    const term = this.searchTerm.toLowerCase();
    return this.Booking.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.phone_no.toLowerCase().includes(term) ||
      item.bookingId.toString().includes(term)
    );
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }
  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredData.length) this.currentPage++;
  }

  editItem(item: any) {
      const modalRef =this.modalService.open(BookingFormComponent, { backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true, })
      console.log('Edit', item);
      modalRef.componentInstance.bookingData = item;
  }

  deleteItem(item: any) {
     this.api.BookingDeleteById(item.bookingId).subscribe({next:(res:any)=>{
          
      this.GetAllBooking()
       }})
  }
  
  GetAllBooking(){
    this.api.GetAllBooking().subscribe({next:(res:any)=>{
         this.Booking=res.data;
    }})
  }

 ViewItem(item: any,content:any){
  this.viewData=item
 this.modalService.open(content, { backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true, })
}
   


  createBookingType() {
    console.log('Open Create Booking Modal');
  }

  close(){
    this.modalService.dismissAll();
  }
}

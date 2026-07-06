import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  searchTerm = '';
  currentPage = 1;
  pageSize = environment.pageSize;
  Contact:any[]=[];
  viewData: any;

 
      constructor(
        private api : ApiService,
        private modalService:NgbModal
      ){}

  ngOnInit(): void {
    this.GetAllContact();
  }

  get filteredData() {
  const term = this.searchTerm.toLowerCase();
  return this.Contact.filter(item =>
    item.id.toString().toLowerCase().includes(term) || // safely converted
    item.first.toLowerCase().includes(term) ||
    item.phone.toString().includes(term)
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
    console.log('Edit', item);
  }
  deleteItem(item: any) {
    this.api.contactDeleteById(item.id).subscribe({next:(res:any)=>{
          
      this.GetAllContact()
       }})
  }

 ViewItem(item: any,content:any){
  this.viewData=item
 this.modalService.open(content, { backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true, })
}

  GetAllContact() {
     this.api.GetAllContact().subscribe({next:(res:any)=>{
       this.Contact=res.data;
       console.log("data",this.Contact)
     }})
  }
}
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-master-booking-type',
  templateUrl: './master-booking-type.component.html',
  styleUrls: ['./master-booking-type.component.css']
})
export class MasterBookingTypeComponent implements OnInit {

  searchTerm = '';
  currentPage = 1;
  pageSize = 12;
  bookingTypeForm!: FormGroup;
  bookingTypes: any[] = [];
  isEditMode = false;
  editedItemId: number | null = null;
   
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getallBookingType();
    this.bookingTypeForm = this.fb.group({
      type: ['', Validators.required]
    });
  }

  get filteredData() {
    const term = this.searchTerm.toLowerCase();
    return this.bookingTypes.filter(item =>
      item.type.toLowerCase().includes(term) ||
      item.bookingTypeId.toString().includes(term)
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

  ViewItem(item:any, content:any){

  }

  editItem(item: any, content:any) {
    console.log('Editing Item:', item);
    this.isEditMode = true;
    this.editedItemId = item.bookingTypeId;

    this.bookingTypeForm.patchValue({
      type: item.type
    });

    // Open modal (reusing create modal for edit too)
    this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'main_add_popup',
      keyboard: true,
      centered: true
    });
  }

  deleteBookingType(item: any) {
       this.api.DeleteById(item.bookingTypeId).subscribe({next:(res:any)=>{
          
      this.getallBookingType()
       }})
  }

  createBookingType(content: TemplateRef<any>) {
    this.isEditMode = false;
    this.editedItemId = null;
    this.bookingTypeForm.reset();
    this.modalService.open(content, { backdrop: 'static', windowClass: 'main_add_popup', keyboard: true, centered: true });
  }
   
  getallBookingType(){
    this.api.GetBookingType().subscribe({next:(res:any)=>{
      this.bookingTypes = res.data || [];
    }})
  }


  onSubmit(): void {
    if (this.bookingTypeForm.valid) {
      const formValue = this.bookingTypeForm.value;
      console.log('Form Submitted:', formValue);

      if (this.isEditMode && this.editedItemId !== null) {
        // Call Update API
        const payload = { type: formValue.type };
        this.api.UpdateBookingType(this.editedItemId, payload).subscribe({
          next: (res) => {
            console.log('Updated:', res);
            this.getallBookingType();
            this.close();
          }
        });
      } else {
        // Create New
        const formData = new FormData();
        formData.append('type', formValue.type);
        this.api.CreateBookingType(formData).subscribe({next: (res: any) => {
            console.log('Created:', res);
            this.getallBookingType();
            this.close();
          }
        });
      }
    }
  }
  close(){
    this.modalService.dismissAll();
  }

}

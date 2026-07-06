import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
//import { DriverEditAddComponent } from './driver-edit-add/driver-edit-add.component';
import { ApiService } from 'src/app/services/api.service';
//import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
//import { MatSort, MatSortModule } from '@angular/material/sort';
//import { MatTableDataSource, MatTableModule } from '@angular/material/table';
//import { MatInputModule } from '@angular/material/input';
//import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  driverForm!: FormGroup;
  data: any;
 AllDriver:any[]=[]


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private api: ApiService
  ) {}

 

  ngOnInit(): void {
    this.GetAllDriver();
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      address: [''],
    });

  }


get filteredData() {
    const term = this.searchTerm.toLowerCase();
    return this.AllDriver.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.phone.toLowerCase().includes(term) ||
      item.driverID.toString().includes(term)
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
    if (this.currentPage * this.pageSize < this.filteredData.length)
      this.currentPage++;
  }

  editItem(item: any,content:any) {
    this.data = item;

    this.driverForm.patchValue(this.data);
    console.log("dataaaaa",this.driverForm.value)
     this.modalService.open(content);
  }

  deleteItem(item: any) {
    
  }

  OpenDriver(content: any) {
    this.modalService.open(content);
    console.log('Open Create Booking Modal');
  }

  onSubmitDialog(): void {
    if (this.driverForm.valid) {
      console.log(this.driverForm.value);
      if (this.data) {
        debugger;
        this.api.EditdriverById(this.data.driverID, this.driverForm.value).subscribe({next: (data) => {
              console.log('Cars:', data);
            },
          });
      } else {
        this.api.CreateDriver(this.driverForm.value).subscribe({next: (data) => {
            console.log('Cars:', data);
          },
        });
      }
    }
  }

  GetAllDriver(){
    
    this.api.GetAllDriver().subscribe({
      next: (res:any) => {
      this.AllDriver=res.data
      console.log("Data",this.AllDriver);
      }
    });
  }

  close(){
    this.modalService.dismissAll();
  }
}

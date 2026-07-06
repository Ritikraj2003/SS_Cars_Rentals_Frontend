
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-driver-edit-add',
  templateUrl: './driver-edit-add.component.html',
  styleUrls: ['./driver-edit-add.component.css']
})
export class DriverEditAddComponent implements OnInit {

    DriverForm:FormGroup =new FormGroup({});


   constructor(
    private formBuilder: FormBuilder,
    private api:ApiService,
    private _dialogref:MatDialogRef<DriverEditAddComponent>,
    @Inject(MAT_DIALOG_DATA)  public data:any
   
  ) { }

  ngOnInit(): void {
    this.DriverForm = this.formBuilder.group({
      name: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      address: ['']
    });

    this.DriverForm.patchValue(this.data);
  }

Submit(){
    if(this.DriverForm.valid){
      console.log(this.DriverForm.value)
      if(this.data){
        debugger;
       this.api.EditdriverById(this.data.driverID,this.DriverForm.value).subscribe({next: (data) => {
        console.log('Cars:', data);
        this._dialogref.close(true);
      }

    });
        
      }
      else{
       this.api.CreateDriver(this.DriverForm.value).subscribe({next: (data) => {
        console.log('Cars:', data);
        this._dialogref.close(true);
      }

    });
    }
  }
  }
  
 
}

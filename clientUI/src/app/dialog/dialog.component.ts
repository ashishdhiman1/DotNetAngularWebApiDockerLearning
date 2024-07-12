import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  
  employeeForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      salary: ['', Validators.required] 
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['phone'].setValue(this.editData.phone);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
   
    }
  }

  get fc() {
    return this.employeeForm.controls;
  }
  addEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    if (!this.editData) {
      if (this.employeeForm.valid) {       
        this.api.postEmployee(this.employeeForm.value).subscribe({
          next: (res) => {
            alert('Product Added');
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('error while adding product');
          },
        });
      }
    } else {
      this.updateEmployee();
    }
  }
  updateEmployee() {
    this.api.putEmployee(this.employeeForm.value, this.editData.id).subscribe({
      next: (res) => {
        console.log(res)
        alert('Product updated');
        this.employeeForm.reset();
        this.dialogRef.close('updated');
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './api.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['employeeName', 'email', 'phone', 'salary','action'];
  dataSource !: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, private api: ApiService){}
  ngOnInit(): void {
    this.getAllEmployees()
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllEmployees();
        }
      });
  }
  getAllEmployees(){
   this.api.getEmployees().subscribe({
    next:(res)=>{
      this.dataSource=res
      console.log(res)
    },
    error: (err) => {
      console.error('Error fetching records:', err);
      alert('Error while fetching records');
    },
   })
  }

  editProduct(row: string) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'updated') {
          this.getAllEmployees();
        }
      });
  }

  deleteProduct(id: number) {
    this.api.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('deleted');
        this.getAllEmployees();
      },
      error: (err) => {
        alert('Error while deleting');
      },
    });
  }
}

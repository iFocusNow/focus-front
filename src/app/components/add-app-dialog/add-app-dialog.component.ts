import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { App } from 'src/app/models/app';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.scss'],
})
export class AddAppDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<App>;
  displayedColumns: string[] = ['logo', 'name'];
  selectedRowIndex: number = 0;

  week = this._formBuilder.group({
    is_monday: false,
    is_tuesday: false,
    is_wednesday: false,
    is_thursday: false,
    is_friday: false,
    is_saturday: false,
    is_sunday: false,
  });

  constructor(
    private dialogRef: MatDialogRef<AddAppDialogComponent>,
    private appService: AppService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getApps();
  }

  getApps() {
    this.appService.getApps().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  selectRow(id: number) {
    // Save the selected row as the app id
    this.selectedRowIndex = id;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submit(): void {
    console.log(this.selectedRowIndex);
    if (this.selectedRowIndex === 0) {
      this.openSnackBar('No se ha elegido una aplicación', 'Aceptar');
    }
    // Create the blockperiod
    // If successful: Create the AppDevices
  }
}

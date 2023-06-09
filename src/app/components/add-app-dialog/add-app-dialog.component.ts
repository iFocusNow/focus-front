import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { App } from 'src/app/models/app';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDeviceService } from 'src/app/services/app-device.service';

@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.scss'],
})
export class AddAppDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<App>;
  displayedColumns: string[] = ['logo', 'name'];
  selectedRowIndex: string = '';

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
    private appDeviceService: AppDeviceService,
    private appService: AppService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getApps();
  }

  getApps() {
    this.appService.getApps().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  selectRow(id: string) {
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
    const values = Object.values(this.week.value);
    const anyTrue = values.some((val) => val === true);
    if (this.selectedRowIndex === '') {
      this.openSnackBar('No se ha elegido una aplicación', 'Aceptar');
    } else if (!anyTrue) {
      this.openSnackBar('No se elegido un día de bloqueo', 'Aceptar');
    } else if (this.data.device_id === '') {
      this.openSnackBar('Seleccione un dispositivo', 'Aceptar');
    } else {
      const data = {
        device_id: this.data.device_id,
        app_id: this.selectedRowIndex,
        ...this.week.value,
      };

      this.appDeviceService.addAppDevice(data).subscribe((response: any) => {
        if (response) {
          this.openSnackBar('Aplicación agregada', 'Aceptar');
        }
        this.dialogRef.close(response);
      });

      this.dialogRef.close();
    }
  }
}

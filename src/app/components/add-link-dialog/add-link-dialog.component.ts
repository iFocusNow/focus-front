import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.scss'],
})
export class AddLinkDialogComponent {
  week = this._formBuilder.group({
    is_monday: false,
    is_tuesday: false,
    is_wednesday: false,
    is_thursday: false,
    is_friday: false,
    is_saturday: false,
    is_sunday: false,
  });

  linkFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<AddLinkDialogComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  submit(): void {
    console.log(this.linkFormControl.value);

    const values = Object.values(this.week.value);
    const anyTrue = values.some((val) => val === true);
    if (!anyTrue) {
      this.openSnackBar('No se elegido un día de bloqueo', 'Aceptar');
    } else if (this.data.device_id === "") {
      this.openSnackBar('Seleccione un dispositivo', 'Aceptar');
    } else if (this.linkFormControl.value === '') {
      this.openSnackBar('Agrege un URL para bloquear', 'Aceptar');
    } else if (this.nameFormControl.value === '') {
      this.openSnackBar('Agrege el nombre del URL', 'Aceptar');
    } else {
      // Create the blockperiod
      console.log('Should create blockperiod in backend');
      // If successful: Create the Links
      console.log(
        'Should create Link a device_id: ',
        this.data.device_id,
        'name: ',
        this.nameFormControl.value,
        ' and link: ',
        this.linkFormControl.value
      );
      this.dialogRef.close();
    }
  }
}

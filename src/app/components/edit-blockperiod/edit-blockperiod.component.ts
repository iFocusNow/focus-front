import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-blockperiod',
  templateUrl: './edit-blockperiod.component.html',
  styleUrls: ['./edit-blockperiod.component.scss'],
})
export class EditBlockperiodComponent implements OnInit {
  week!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditBlockperiodComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.week = this._formBuilder.group({
      is_monday: this.data.blockperiod.is_monday,
      is_tuesday: this.data.blockperiod.is_tuesday,
      is_wednesday: this.data.blockperiod.is_wednesday,
      is_thursday: this.data.blockperiod.is_thursday,
      is_friday: this.data.blockperiod.is_friday,
      is_saturday: this.data.blockperiod.is_saturday,
      is_sunday: this.data.blockperiod.is_sunday,
    });
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
    const values = Object.values(this.week.value);
    const anyTrue = values.some((val) => val === true);

    if (!anyTrue) {
      this.openSnackBar('No se elegido un día de bloqueo', 'Aceptar');
    } else {
      // Change blockperiod_id
      console.log(
        "Change blockperiod times with it's id ",
        this.data.blockperiod_id
      );
      this.dialogRef.close();
    }
  }
}

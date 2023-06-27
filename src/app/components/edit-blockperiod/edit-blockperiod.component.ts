import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlockPeriodService } from 'src/app/services/block-period.service';

@Component({
  selector: 'app-edit-blockperiod',
  templateUrl: './edit-blockperiod.component.html',
  styleUrls: ['./edit-blockperiod.component.scss'],
})
export class EditBlockperiodComponent implements OnInit {
  week!: FormGroup;
  blockperiod_id: string = '';

  constructor(
    private dialogRef: MatDialogRef<EditBlockperiodComponent>,
    private blockPeriodService: BlockPeriodService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.week = this._formBuilder.group({
      is_monday: this.data.is_monday,
      is_tuesday: this.data.is_tuesday,
      is_wednesday: this.data.is_wednesday,
      is_thursday: this.data.is_thursday,
      is_friday: this.data.is_friday,
      is_saturday: this.data.is_saturday,
      is_sunday: this.data.is_sunday,
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
      console.log(this.data.block_period_id);
      this.blockPeriodService
        .editBlockPeriod({ ...this.week.value }, this.data.block_period_id)
        .subscribe((response: any) => {
          this.openSnackBar('Periodo de bloqueo editado', 'Aceptar');
          this.dialogRef.close(response);
        });

      this.dialogRef.close();
    }
  }
}

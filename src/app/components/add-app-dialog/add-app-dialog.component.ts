import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.scss'],
})
export class AddAppDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddAppDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}

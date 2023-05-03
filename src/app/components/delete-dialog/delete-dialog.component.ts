import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  element!: string;

  ngOnInit(): void {
    if (this.data.is_app) {
      this.element = 'la app';
    } else {
      this.element = 'el link';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  unlock(): void {
    if (this.data.is_app) {
      // Unlock for app
      console.log(
        'You need the ',
        this.data.device_id,
        ' and ',
        this.data.app_id,
        ' to unlock'
      );
    } else {
      // Unlock
      console.log('You need the ', this.data.link_id);
    }

    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDeviceService } from 'src/app/services/app-device.service';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private appDeviceService: AppDeviceService,
    private linkService: LinkService,
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
      console.log(this.data);
      this.appDeviceService
        .deleteAppDevice(this.data.app_id, this.data.device_id)
        .subscribe((response) => {
          this.dialogRef.close(response);
        });
    } else {
      this.linkService.deleteLink(this.data.link_id).subscribe((response) => {
        this.dialogRef.close(response);
      });
    }

    this.dialogRef.close();
  }
}

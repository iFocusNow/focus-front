import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { App } from 'src/app/models/app';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.scss'],
})
export class AddAppDialogComponent implements OnInit {
  dataSource: App[] = [];
  displayedColumns: string[] = ['logo', 'name'];

  constructor(
    private dialogRef: MatDialogRef<AddAppDialogComponent>,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.getApps();
  }

  getApps() {
    this.appService.getApps().subscribe((response: any) => {
      this.dataSource = response;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { App } from 'src/app/models/app';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.scss'],
})
export class AddAppDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<App>;
  displayedColumns: string[] = ['logo', 'name'];
  selectedRowIndex: number = 0;

  constructor(
    private dialogRef: MatDialogRef<AddAppDialogComponent>,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.getApps();
  }

  getApps() {
    this.appService.getApps().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  selectRow(index: number) {
    this.selectedRowIndex = index;
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

  submit(): void {
    this.dialogRef.close();
  }
}

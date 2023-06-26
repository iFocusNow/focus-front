import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppDeviceService } from 'src/app/services/app-device.service';
import { AppService } from 'src/app/services/app.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditBlockperiodComponent } from '../edit-blockperiod/edit-blockperiod.component';

export interface AppDeviceDto {
  device_id: string;
  app_name: string;
  logo_url: string;
  blockperiod_id: string;
  is_monday: boolean;
  is_tuesday: boolean;
  is_wednesday: boolean;
  is_thursday: boolean;
  is_friday: boolean;
  is_saturday: boolean;
  is_sunday: boolean;
}

const AppDeviceData: AppDeviceDto[] = [];

@Component({
  selector: 'app-apps-table',
  templateUrl: './apps-table.component.html',
  styleUrls: ['./apps-table.component.scss'],
})
export class AppsTableComponent implements OnChanges {
  @Input() selectedValue: number = 0;
  dataSource = new MatTableDataSource<AppDeviceDto>(AppDeviceData);
  rows: any[] = [];
  displayedColumns: string[] = ['logo', 'name', 'blockperiod', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let device_id = '';
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      device_id = changes['selectedValue'].currentValue;
      console.log('selectedValue', device_id);
      this.getAppDevice(device_id);
    }
  }

  constructor(
    private appDeviceService: AppDeviceService,
    private appService: AppService,
    public dialog: MatDialog
  ) {}

  // getApp(appDevice: any): any {
  //   this.appService.getApp(appDevice.app_id).subscribe((response: any): any => {
  //     if (response) {
  //       const row: AppDeviceDto = {
  //         app_id: appDevice.app_id,
  //         device_id: appDevice.device_id,
  //         blockperiod_id: appDevice.blockperiod_id,
  //         app_name: response[0].name,
  //         app_logo: response[0].logo_url,
  //       };
  //       this.rows = [...this.rows, row];
  //       return this.rows;
  //     }
  //   });
  // }
  //

  getAppDevice(device_id: string) {
    this.appDeviceService.getAppDevice(device_id).subscribe((response: any) => {
      if (response) {
        this.dataSource = new MatTableDataSource<AppDeviceDto>(response);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  editItem(item: AppDeviceDto) {
    console.log('Editing', item);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...item,
    };
    const dialogRef = this.dialog.open(EditBlockperiodComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed: ', result);
    });
  }

  deleteItem(item: AppDeviceDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      is_app: true,
      ...item,
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed: ', result);
    });
  }
}

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

// export interface AppDeviceExt {
//   app_id: number;
//   device_id: number;
//   blockperiod_id: number;
//   app_logo: string;
//   app_name: string;
// }

export interface AppDeviceExt {
  app_id: number;
  device_id: number;
  blockperiod_id: number;
  app: {
    id: number;
    logo_url: string;
    name: string;
  };
  blockperiod: {
    id: number;
    is_monday: boolean;
    is_tuesday: boolean;
    is_wednesday: boolean;
    is_thursday: boolean;
    is_friday: boolean;
    is_saturday: boolean;
    is_sunday: boolean;
  };
}

const AppDeviceData: AppDeviceExt[] = [
  {
    device_id: 1,
    app_id: 1,
    blockperiod_id: 1,
    app: {
      id: 1,
      name: 'Instagram',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e7/20160929061519!Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png',
    },
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 2,
    blockperiod_id: 2,
    app: {
      id: 2,
      name: 'Facebook',
      logo_url:
        'https://logovector.net/wp-content/uploads/2011/11/facebook-f-logo-195x195.png',
    },
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 1,
    blockperiod_id: 1,
    app: {
      id: 1,
      name: 'Instagram',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e7/20160929061519!Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png',
    },
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 2,
    blockperiod_id: 2,
    app: {
      id: 2,
      name: 'Facebook',
      logo_url:
        'https://logovector.net/wp-content/uploads/2011/11/facebook-f-logo-195x195.png',
    },
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 1,
    blockperiod_id: 1,
    app: {
      id: 1,
      name: 'Instagram',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e7/20160929061519!Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png',
    },
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 2,
    blockperiod_id: 2,
    app: {
      id: 2,
      name: 'Facebook',
      logo_url:
        'https://logovector.net/wp-content/uploads/2011/11/facebook-f-logo-195x195.png',
    },
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 1,
    blockperiod_id: 1,
    app: {
      id: 1,
      name: 'Instagram',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e7/20160929061519!Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png',
    },
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 2,
    blockperiod_id: 2,
    app: {
      id: 2,
      name: 'Facebook',
      logo_url:
        'https://logovector.net/wp-content/uploads/2011/11/facebook-f-logo-195x195.png',
    },
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 1,
    blockperiod_id: 1,
    app: {
      id: 1,
      name: 'Instagram',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e7/20160929061519!Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png',
    },
    blockperiod: {
      id: 1,
      is_monday: true,
      is_tuesday: true,
      is_wednesday: true,
      is_thursday: true,
      is_friday: true,
      is_saturday: false,
      is_sunday: false,
    },
  },
  {
    device_id: 1,
    app_id: 2,
    blockperiod_id: 2,
    app: {
      id: 2,
      name: 'Facebook',
      logo_url:
        'https://logovector.net/wp-content/uploads/2011/11/facebook-f-logo-195x195.png',
    },
    blockperiod: {
      id: 2,
      is_monday: true,
      is_tuesday: false,
      is_wednesday: false,
      is_thursday: true,
      is_friday: true,
      is_saturday: true,
      is_sunday: false,
    },
  },
];

@Component({
  selector: 'app-apps-table',
  templateUrl: './apps-table.component.html',
  styleUrls: ['./apps-table.component.scss'],
})
export class AppsTableComponent implements OnChanges {
  @Input() selectedValue: number = 0;
  dataSource = new MatTableDataSource<AppDeviceExt>(AppDeviceData);
  // dataSource: any[] = [];
  rows: any[] = [];
  displayedColumns: string[] = ['logo', 'name', 'blockperiod', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      this.selectedValue = changes['selectedValue'].currentValue;
    }
    this.getAppDevice();
  }

  constructor(
    private appDeviceService: AppDeviceService,
    private appService: AppService,
    public dialog: MatDialog
  ) {}

  // getApp(appDevice: any): any {
  //   this.appService.getApp(appDevice.app_id).subscribe((response: any): any => {
  //     if (response) {
  //       const row: AppDeviceExt = {
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

  async getAppDevice() {
    // this.rows = [];
    // this.appDeviceService
    //   .getAppDevice(this.selectedValue)
    //   .subscribe((response: any) => {
    //     response.map((appDevice: any) => {
    //       this.getApp(appDevice);
    //     });
    //   });
    // Works as table
    // console.table(AppDeviceData);
    // Does not work as table
    // this.dataSource = this.rows;
  }

  editItem(item: AppDeviceExt) {
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

  deleteItem(item: AppDeviceExt) {
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

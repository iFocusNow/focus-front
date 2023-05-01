import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppDeviceService } from 'src/app/services/app-device.service';
import { AppService } from 'src/app/services/app.service';

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
  },
  {
    device_id: 1,
    app_id: 2,
    blockperiod_id: 2,
    app: {
      id: 2,
      name: 'Facebook',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e7/20160929061519!Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png',
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
  dataSource: AppDeviceExt[] = AppDeviceData;
  // dataSource: any[] = [];
  rows: any[] = [];
  displayedColumns: string[] = ['logo', 'name', 'blockperiod', 'actions'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      this.selectedValue = changes['selectedValue'].currentValue;
    }
    this.getAppDevice();
  }

  constructor(
    private appDeviceService: AppDeviceService,
    private appService: AppService
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

  deleteItem(item: any) {
    console.log('Deleting ', item);
  }
}

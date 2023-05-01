import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppDeviceService } from 'src/app/services/app-device.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-apps-table',
  templateUrl: './apps-table.component.html',
  styleUrls: ['./apps-table.component.scss'],
})
export class AppsTableComponent implements OnChanges {
  @Input() selectedValue: number = 0;
  rows: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      this.selectedValue = changes['selectedValue'].currentValue;
    }
    this.getAppDevices();
  }

  constructor(private appDeviceService: AppDeviceService) {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  getAppDevices() {
    this.appDeviceService
      .getAppDevices(this.selectedValue)
      .subscribe((response: any) => {
        this.rows = response;
        console.log(response);
      });
  }
}

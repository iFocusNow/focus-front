import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';
import { AddAppDialogComponent } from '../add-app-dialog/add-app-dialog.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  selectedValue: number = 0;
  devices: Device[] = [];
  child_id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.child_id = params['id'];
      this.getChildrenDevices();
    });
  }

  onSelectedChange(value: number) {
    this.selectedValue = value;
  }

  getChildrenDevices() {
    this.deviceService
      .getChildrenDevices(this.child_id)
      .subscribe((response: any) => {
        this.devices = response;
      });
  }

  setSelectionName(device: Device) {
    let type: string;
    if (device.type === 'phone') {
      type = 'Celular';
    } else if (device.type === 'laptop') {
      type = 'Laptop';
    } else if (device.type === 'pc') {
      type = 'Computadora';
    } else {
      type = 'Tablet';
    }
    return type + ' ' + device.brand;
  }

  openAppDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      device_id: this.selectedValue,
    };
    const dialogRef = this.dialog.open(AddAppDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed: ', result);
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

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
    private deviceService: DeviceService
  ) // public dialog: MatDialog
  {}

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
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   data: {name: this.name, animal: this.animal},
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}

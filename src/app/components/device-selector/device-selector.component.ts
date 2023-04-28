import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss'],
})
export class DeviceSelectorComponent {
  devices: Device[] = [];

  child_id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.child_id = params['id'];
      this.getChildrenDevices();
    });
  }

  getChildrenDevices() {
    this.deviceService
      .getChildrenDevices(this.child_id)
      .subscribe((response: any) => {
        this.devices = response;
        console.log(this.devices);
      });
  }
}

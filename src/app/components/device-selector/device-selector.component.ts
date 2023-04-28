import { Component } from '@angular/core';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss'],
})
export class DeviceSelectorComponent {
  devices: Device[] = [
    {
      id: 1,
      child_id: 1,
      type: 'phone',
      brand: 'Iphone',
    },
    {
      id: 2,
      child_id: 1,
      type: 'pc',
      brand: 'Omen',
    },
  ];
}

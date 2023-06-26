import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Child } from 'src/app/models/child';
import { Device } from 'src/app/models/device';
import { ChildService } from 'src/app/services/child.service';
import { DeviceService } from 'src/app/services/device.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent {
  child_id!: string;
  device_id: string = '';
  child: Child[] = [];
  device!: Device;
  //devices: number[]=[];
  photo_url: string =
    'https://avatars.steamstatic.com/1cfdee9bd003f0559d045b6223b321dd36c34958_full.jpg';

  value!: string;
  name_devices: string[] = [];
  deviceName!: string;
  childName!: string;
  deviceType!: string;

  type_devices = [
    { value: 'PHONE', viewValue: 'Celular' },
    { value: 'TABLET', viewValue: 'Tablet' },
    { value: 'LAPTOP', viewValue: 'Laptop' },
    { value: 'PC', viewValue: 'PC' },
  ];

  constructor(
    private childService: ChildService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private deviceService: DeviceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.child_id = this.activatedRouter.snapshot.params['id'];
    this.getNameChildren();
    /*
    this.deviceService.getDevices().subscribe((data) => {
      console.log(data);
      this.device_id = Object.keys(data).length;
    });

      console.log(this.device_id);
*/
  }

  getNameChildren() {
    this.childService.getChildren(this.child_id).subscribe((response: any) => {
      this.child = response;
    });
    this.childService.getChildren(this.child_id).subscribe({
      next: (data: Child) => {
        this.childName = data.name;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  volverHome(): void {
    this.router.navigate(['/home']);
  }
  getDeviceType(event: MatSelectChange): void {
    const selectedValue = event.value;
    this.deviceType = selectedValue;
    //console.log('Dispositivo:', selectedValue);
  }

  saveDevice(): void {
    if (this.deviceType == 'PHONE') {
      const device: Device = {
        //id: this.device_id,
        id: '',
        child_id: this.child_id,
        type: 'PHONE',
        brand: this.deviceName,
      };
      this.device = device;
    } else if (this.deviceType == 'PC') {
      const device: Device = {
        //id: this.device_id,
        id: '',
        child_id: this.child_id,
        type: 'PC',
        brand: this.deviceName,
      };
      this.device = device;
    } else if (this.deviceType == 'TABLET') {
      const device: Device = {
        //id: this.device_id,
        id: '',
        child_id: this.child_id,
        type: 'TABLET',
        brand: this.deviceName,
      };
      this.device = device;
    } else {
      const device: Device = {
        //id: this.device_id,
        id: '',
        child_id: this.child_id,
        type: 'LAPTOP',
        brand: this.deviceName,
      };
      this.device = device;
    }

    this.deviceService.addDevice(this.device).subscribe({
      next: (data) => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        this.snackBar.open('El dispositivo se registró correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

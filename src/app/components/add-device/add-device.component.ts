import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Child } from 'src/app/models/child';
import { Device } from 'src/app/models/device';
import { ChildService } from 'src/app/services/child.service';
import { DeviceService } from 'src/app/services/device.service';
import { ParentService } from 'src/app/services/parent.service';
import { map } from 'rxjs/operators';
import { Parent } from 'src/app/models/parent';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent {
  child_id!: string;
  device_id: string = '';
  email_id = localStorage.getItem('email') || '';
  child: Child[] = [];
  device!: Device;
  value!: string;
  name_devices: string[] = [];
  deviceName!: string;
  childName!: string;
  deviceType!: string;
  photo_url: string | undefined;

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
    private snackBar: MatSnackBar,
    private parentService: ParentService,
  ) {}

  ngOnInit(): void {
    this.child_id = this.activatedRouter.snapshot.params['id'];
    this.getNameChildren();
    this.getParentData();
  }

  getParentData() {
    this.parentService.getParent(this.email_id).subscribe((response: any) => {
      this.photo_url = response.photo_url;
      console.log(this.photo_url);
    });
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
  }

  saveDevice(): void {
    if (this.deviceType == 'PHONE') {
      const device: Device = {
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
    } else if (this.deviceType == 'LAPTOP') {
      const device: Device = {
        //id: this.device_id,
        id: '',
        child_id: this.child_id,
        type: 'LAPTOP',
        brand: this.deviceName,
      };
      this.device = device;
    } else {
      this.snackBar.open('No se ha seleccionado el dispositivo', 'OK', {
        duration: 3000,
      });
    }

    this.deviceService.addDevice(this.child_id, this.device).subscribe({
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

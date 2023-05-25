import { Component, ViewChild, ElementRef } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChildService } from 'src/app/services/child.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent {
  id: number = 1;
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string | undefined;
  photo_url: string | undefined;
  parentData: Parent[] = [];

  name_devices: { deviceName: string, deviceType: string }[] = [];
  deviceName: string = '';
  childName: string = '';
  deviceType: string = '';

  type_devices = [
    { value: 'phone', viewValue: 'Celular' },
    { value: 'tablet', viewValue: 'Tablet' },
    { value: 'laptop', viewValue: 'Laptop' },
    { value: 'pc', viewValue: 'PC' }
  ];

  @ViewChild('deviceNameInput', { static: false }) deviceNameInput!: ElementRef;

  constructor(
    private childService: ChildService,
    private parentService: ParentService,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getParentData();
  }

  getParentData() {
    this.parentService.getParent(this.id).subscribe((response: any) => {
      this.parentData = response;
      this.last_name_father = this.parentData[0].last_name_father;
      this.last_name_mother = this.parentData[0].last_name_mother;
      this.email = this.parentData[0].email;
      this.photo_url = this.parentData[0].photo_url;
    });
  }

  volverHome(): void {
    this.router.navigate(['']);
  }

  getDevice(device: string): void {
    console.log(device);
  }

  getDeviceType(event: any): void {
    this.deviceType = event.value;
    console.log('Dispositivo:', this.deviceType);
  }

  getDeviceName(): void {
    console.log('Nombre: ', this.deviceName);
    this.TemporaryList({ deviceName: this.deviceName, deviceType: this.deviceType });
    this.deviceName = '';
    this.deviceType = '';
  }

  TemporaryList(device: { deviceName: string, deviceType: string }): void {
    this.name_devices.push(device);
    console.log(this.name_devices);
  }

  deleteDevice(index: number): void {
    this.name_devices.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    const newChild = {
      parent_id: this.id,
      name: this.childName,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString()
    };

    this.childService.addChild(newChild).subscribe((response: any) => {
      console.log('Child added successfully');

      this.name_devices.forEach(device => {
        const newDevice = {
          child_id: response.id,
          type: device.deviceType,
          brand: device.deviceName
        };

        this.deviceService.addDevice(newDevice).subscribe(response => {
          console.log('Device added successfully');
        });
      });

      this.router.navigate(['']);
    });
  }
}

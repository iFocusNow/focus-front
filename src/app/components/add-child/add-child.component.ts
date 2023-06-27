import {
  Component,
  defineInjectable,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { MatSelectChange } from '@angular/material/select';
import { Child } from 'src/app/models/child';
import { ChildService } from 'src/app/services/child.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent {
  //Esto lo puse para poner una foto, pero en realidad no va
  parent_id = localStorage.getItem('id') || '';
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string | undefined;
  photo_url: string | undefined;
  parentData: Parent[] = [];
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;

  devices: Device[] = [];

  value!: string;
  name_devices: string[] = [];
  deviceName!: string;
  childName!: string;
  deviceType!: string;

  type_devices = [
    { value: 'phone', viewValue: 'Celular' },
    { value: 'tablet', viewValue: 'Tablet' },
    { value: 'laptop', viewValue: 'Laptop' },
    { value: 'pc', viewValue: 'PC' },
  ];

  @ViewChild('deviceNameInput', { static: false }) deviceNameInput!: ElementRef;

  constructor(private parentService: ParentService, private router: Router, 
    private childService: ChildService, 
    private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.getParentData();
  }

  //lo hice para jalar una foto
  getParentData() {
    this.parentService.getParent(this.parent_id).subscribe((response: any) => {
      this.parentData = response;
      this.last_name_father = this.parentData[0].last_name_father;
      this.last_name_mother = this.parentData[0].last_name_mother;
      this.email = this.parentData[0].email;
      this.photo_url = this.parentData[0].photo_url;
    });
  }

  volverHome(): void {
    this.router.navigate(['/home']);
  }

  getDeviceType(event: MatSelectChange): void {
    const selectedValue = event.value;
    console.log('Dispositivo:', selectedValue);
    this.deviceType = selectedValue;
  }

  getDeviceName(): void {
    console.log('Nombre: ', this.deviceName);
    this.TemporaryList(this.deviceName);
    this.deviceName = '';
    this.deviceType = '';
  }

  deleteDevice(index: number): void {
    this.name_devices.splice(index, 1);
  }

  TemporaryList(name_device: string): void {
    const device: Device = {
      type: this.deviceType.toUpperCase() as 'PHONE' | 'TABLET' | 'LAPTOP' | 'PC',
      brand: this.deviceName,
      child_id: '',
    };
    this.name_devices.push(name_device);
    console.log(this.name_devices);
  }

  addChild(): void {
    const child: Child = {
      name: this.childName,
      parent_id: this.parent_id,
      created_at: "",
      updated_at: "",
    };

    this.childService.addChild(child, this.parent_id).subscribe((response: any) => {
      
    });
  }
}

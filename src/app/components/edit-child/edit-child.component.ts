import {
  Component,
  defineInjectable,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Device } from 'src/app/models/device';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildService } from 'src/app/services/child.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Child } from 'src/app/models/child';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss'],
})
export class EditChildComponent {
  child_id!: string;
  value!: string;
  name_devices: string[] = [];
  devices: Device[] = [];
  child: Child[] = [];
  deviceName!: string;
  childName!: string;
  childNameprob!: string;
  deviceNameprob!: string;
  created_at!: string;

  index!: number;

  type_devices = [
    { value: 'phone', viewValue: 'Celular' },
    { value: 'tablet', viewValue: 'Tablet' },
    { value: 'laptop', viewValue: 'Laptop' },
    { value: 'pc', viewValue: 'PC' },
  ];

  @ViewChild('deviceNameInput', { static: false }) deviceNameInput!: ElementRef;

  id: string = 'c29107e7-eda8-44cf-9960-30a2a821a4ea';
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string | undefined;
  photo_url: string | undefined;
  parentData: Parent[] = [];
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;

  constructor(
    private childService: ChildService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private parentService: ParentService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.child_id = this.activatedRouter.snapshot.params['id'];
    this.getNameChildren();
    this.getChildrenDevices();
    this.getParentData();
  }

  //pa la foto pes porque si x2 xd
  getParentData() {
    this.parentService.getParent(this.id).subscribe((response: any) => {
      this.parentData = response;
      this.last_name_father = this.parentData[0].last_name_father;
      this.last_name_mother = this.parentData[0].last_name_mother;
      this.email = this.parentData[0].email;
      this.photo_url = this.parentData[0].photo_url;
    });
  }

  getNameChildren() {
    this.childService.getChildren(this.child_id).subscribe((response: any) => {
      this.child = response;
    });
    this.childService.getChildren(this.child_id).subscribe({
      next: (data: Child) => {
        this.childName = data.name;
        this.created_at = data.created_at;
        this.childNameprob = data.name;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getChildrenDevices() {
    this.deviceService
      .getChildrenDevices(this.child_id)
      .subscribe((response: any) => {
        this.devices = response;
      });
    for (let i = 0; i < this.devices.length; i++) {
      this.name_devices.push(this.devices[i].brand);
    }
  }

  getDevice(device: string): void {
    console.log(device);
  }

  getDeviceName(): void {
    if (this.index != undefined) {
      this.devices[this.index].brand = this.deviceNameprob;
    }
    this.deviceNameprob = '';
  }

  deleteDevice(index: number): void {
    this.devices.splice(index, 1);
  }

  editDevice(index: number): void {
    this.index = index;
    if (this.index != undefined) {
      this.deviceNameprob = this.devices[index].brand;
    }
  }

  BackHome(): void {
    this.router.navigate(['/home']);
  }

  saveChild(): void {
    const child: Child = {
      id: this.child_id,
      parent_id: this.id,
      name: this.childNameprob,
      created_at: this.created_at,
      updated_at: Date.now().toString(),
    };

    this.childService.updateChild(child).subscribe({
      next: (data) => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    /*const device:Device = {
        id: this.index + 1,
        child_id:this.child_id,
        type: this.devices[this.index].type,
        brand: this.devices[this.index].brand

      }

      this.deviceService.updateDevice(device).subscribe({
        next: (data)  => {

        },
        error: (err) => {
          console.log(err);
        }
      });*/
  }
}

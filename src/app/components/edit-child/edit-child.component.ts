import { Component, defineInjectable, ViewChild, ElementRef } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { ActivatedRoute, Router , Params } from '@angular/router';
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
  styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent {
  
  child_id: number = 2;
  value!:string;
  name_devices: string[] = []
  devices:Device[] = [];
  deviceName!: string;
  childName!: string;
  deviceType!: string;
  
  type_devices = [
    {value:'phone', viewValue:'Celular'},
    {value:'tablet', viewValue:'Tablet'},
    {value:'laptop', viewValue:'Laptop'},
    {value:'pc', viewValue:'PC'}
  ]

  @ViewChild('deviceNameInput', { static: false }) deviceNameInput!: ElementRef;
  //pa la foto pes porque si
  id: number = 1;
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string | undefined;
  photo_url: string | undefined;
  parentData: Parent[] = [];
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;
////////////////

  constructor(private formBuilder:FormBuilder, private childService:ChildService, 
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar, private parentService: ParentService, private deviceService: DeviceService){}

    ngOnInit(): void {
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

    getNameChildren(){
      this.childService.getChildren(this.child_id).subscribe({
        next:(data:Child) => {
        this.childName= (data.name);
      },
      error: (err) => {
        console.log(err);
      }
    });
    }
    getChildrenDevices() {
      this.deviceService
        .getChildrenDevices(this.child_id)
        .subscribe((response: any) => {
          this.devices = response;
        });
    }

    getDevice(device:string):void{
      console.log(device);
    }
    getDeviceType(event: MatSelectChange): void {
      const selectedValue = event.value;
      console.log('Dispositivo:', selectedValue);
    }
    
    getDeviceName(): void {
      console.log('Nombre: ', this.deviceName);
      this.TemporaryList(this.deviceName);
      this.deviceName='';
      
      this.deviceType='';
    }
    
    TemporaryList(name_device:string):void{
      this.name_devices.push(
        
      )
      this.name_devices.push(name_device);
      console.log(this.name_devices);
    }
    
    deleteDevice(index:number):void{
      this.name_devices.splice(index,1);
    }
    editDevice(index:number):void{

    }

    BackHome():void{
      this.router.navigate(['']);
    }
    saveChild():void{
        /////////give up
    }
  
}
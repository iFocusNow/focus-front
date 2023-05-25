import { Component, defineInjectable, ViewChild, ElementRef} from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { MatSelectChange } from '@angular/material/select';
import { NgForm } from '@angular/forms';
import { ChildService } from 'src/app/services/child.service';


@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent {
  //Esto lo puse para poner una foto, pero en realidad no va
  id: number = 1;
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string | undefined;
  photo_url: string | undefined;
  parentData: Parent[] = [];
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;

  value!:string;
  name_devices: string[] = []
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

constructor(private childService: ChildService, private parentService: ParentService, private router:Router) {}

ngOnInit(): void {
  this.getParentData();
}

//lo hice para jalar una foto
getParentData() {
  this.parentService.getParent(this.id).subscribe((response: any) => {
    this.parentData = response;
    this.last_name_father = this.parentData[0].last_name_father;
    this.last_name_mother = this.parentData[0].last_name_mother;
    this.email = this.parentData[0].email;
    this.photo_url = this.parentData[0].photo_url;
  });
}

volverHome():void{
  this.router.navigate(['']);
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
  this.name_devices.push(name_device);
  console.log(this.name_devices);
}

deleteDevice(index:number):void{
  this.name_devices.splice(index,1);
}

onSubmit(form: NgForm) {
  const devices = [];
  if (form.value.phone) devices.push({ type: 'phone', brand: 'Marca del teléfono' });
  if (form.value.tablet) devices.push({ type: 'tablet', brand: 'Marca de la tablet' });
  if (form.value.laptop) devices.push({ type: 'laptop', brand: 'Marca del laptop' });
  if (form.value.pc) devices.push({ type: 'pc', brand: 'Marca de la PC' });

  const newChild = {
    parent_id: this.id,
    name: form.value.childName,
    devices: devices.map(device => {
      return {
        child_id: null,
        type: device.type,
        brand: device.brand
      };
    }),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  };

  this.childService.addChild(newChild).subscribe(response => {
    console.log('Child added successfully');
    this.router.navigate(['']);
  });
}


}

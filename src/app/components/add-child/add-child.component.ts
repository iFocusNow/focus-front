import { Component } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { Router } from '@angular/router';


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
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;




constructor(private parentService: ParentService, private router:Router) {}

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

volverHome():void{
  this.router.navigate(['']);
}

}
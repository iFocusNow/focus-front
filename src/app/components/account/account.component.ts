import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/parent.service';
import { Parent } from 'src/app/models/parent';
import { Router } from '@angular/router';
import { Child } from 'src/app/models/child';
import { ChildService } from 'src/app/services/child.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  id: number = 1;
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string | undefined;
  photo_url: string | undefined;
  parentData: Parent[] = [];
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;
  childRecover: Child[] = [
    {
      id: 1,
      parent_id: 1,
      name: "Cristina",
      created_at: "1682540340",
      updated_at: "1682540340"
    },
    {
      id: 2,
      parent_id: 1,
      name: "Pedro",
      created_at: "1682540340",
      updated_at: "1682540340"
    },
    {
      id: 3,
      parent_id: 1,
      name: "Lisanne",
      created_at: "1682540340",
      updated_at: "1682540340"
    },
    {
      id: 4,
      parent_id: 1,
      name: "Cristina",
      created_at: "1682540340",
      updated_at: "1682540340"
    },
    {
      id: 5,
      parent_id: 1,
      name: "Pedro",
      created_at: "1682540340",
      updated_at: "1682540340"
    },
    {
      id: 6,
      parent_id: 1,
      name: "Lisanne",
      created_at: "1682540340",
      updated_at: "1682540340"
    }
  ]


  constructor(private parentService: ParentService, private childService: ChildService, private router:Router) {}

  ngOnInit(): void {
    this.getParentData();
    this.getParentChildren();
  }

  getParentChildren(): void {
    this.childService.getParentChildren(this.id).subscribe((children: Child[]) => {
      this.childRecover = children;
    });
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

  generateTempCode(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  startCountdown(duration: number): void {
    let remainingTime = duration;
    this.countdown = this.formatTime(remainingTime);

    const interval = setInterval(() => {
      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(interval);
        this.countdown = null;
        this.tempCode = null;
      } else {
        this.countdown = this.formatTime(remainingTime);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onLinkChildClick(): void {
    this.tempCode = this.generateTempCode();
    console.log('Código temporal:', this.tempCode);

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.tempCode = null;
      this.countdown = null;
    }, 5 * 60 * 1000);

    this.startCountdown(5 * 60);
  }
  addChild():void{
    this.router.navigate(["add"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/parent.service';
import { Router } from '@angular/router';
import { ChildService } from 'src/app/services/child.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  id = '';
  last_name_father: string | undefined;
  last_name_mother: string | undefined;
  email: string = localStorage.getItem('email') || '';
  photo_url: string | undefined;
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;
  childRecover: any;
  constructor(
    private parentService: ParentService,
    private childrenService: ChildService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getParentData();
  }

  getParentData() {
    this.parentService.getParent(this.email).subscribe((response: any) => {
      this.last_name_father = response.last_name_father;
      this.last_name_mother = response.last_name_mother;
      this.photo_url = response.photo_url;
      this.id = response.id;
      localStorage.setItem('id', response.id);

      this.getChildrenData(response.id);
    });
  }

  getChildrenData(response_id: any) {
    this.childrenService
      .getParentChildren(response_id)
      .subscribe((response: any) => {
        console.log(response);
        this.childRecover = response;
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
  
  addChild(): void {
    this.router.navigate(['add']);
  }
}

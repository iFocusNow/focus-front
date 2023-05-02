import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  parentData: any;
  tempCode: string | null = null;
  timer: any;
  countdown: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getParentData();
  }

  getParentData(): void {
    this.http.get('http://localhost:3000/parents/1').subscribe(data => {
      this.parentData = data;
    });
  }

  generateTempCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
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
        //console.log('Código temporal expirado');
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
      //console.log('Código temporal expirado');
    }, 5 * 60 * 1000); 

    this.startCountdown(5 * 60);
  }
}
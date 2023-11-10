import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'src/app/models/child';
import { ChildService } from 'src/app/services/child.service';
import { Alert } from 'src/app/models/alerts';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  children: Child[] | undefined;
  visibleNotifications = false;
  sizeNotification = 20;
  alertas: string[] = [];
  alerts: Alert[] | undefined;
  formattedAlerts: { message: string; type: string }[] = [];
  storage = localStorage;

  constructor(
    private childService: ChildService,
    private router: Router,
    private notificationService: NotificationsService,
  ) {}

  ngOnInit(): void {
    // wait for id to be in localStorage
    if (!localStorage.getItem('id')) {
      setTimeout(() => {
        this.getParentChildren();
      }, 150);
    } else {
      this.getParentChildren();
    }
  }

  onNavigate(route: string): void {
    this.router.navigate([route]);
  }

  onNavigateLogout(): void {
    this.storage.removeItem('email');
    this.storage.removeItem('password');
    this.storage.removeItem('id');

    window.location.reload();
  }

  onNavigateChild(child_id: string): void {
    this.router.navigate(['/child', child_id]);
  }
  getParentChildren() {
    this.childService
      .getParentChildren(localStorage.getItem('id') || '')
      .subscribe((response: any) => {
        this.children = response;
        this.notificationService
          .getChildAlert(localStorage.getItem('id')!)
          .subscribe((data: Alert[]) => {
            data.forEach((element: Alert) => {
              this.alertas.push(this.getAlertMessage(element));
            });
          });
      });
  }

  showNotification() {
    this.visibleNotifications = !this.visibleNotifications;
  }

  getAlertMessage(alert: any): string {
    let device_type = '';
    let message = '';

    if (alert.type === 'BLOCK_ENTRY') {
      message = 'ha querido entrar a una aplicación bloqueada';
    } else if (alert.type === 'SOLICIT_UNBLOCK') {
      message = 'ha solicitado un desbloqueo de aplicación';
    } else if (alert.type === 'PHONE_TIME_EXCEEDED') {
      message = 'ha superado el tiempo en pantalla';
    } else {
      return '';
    }

    if (alert.deviceType === 'PHONE') {
      device_type = 'teléfono';
    } else if (alert.deviceType === 'TABLET') {
      device_type = 'tablet';
    } else if (alert.deviceType === 'LAPTOP') {
      device_type = 'laptop';
    } else if (alert.deviceType === 'PC') {
      device_type = 'computadora';
    }

    return (
      'Su hijo(a) ' +
      alert.childName +
      ' ' +
      message +
      ' en el dispositivo ' +
      device_type +
      ' ' +
      alert.deviceBrand
    );
  }
}

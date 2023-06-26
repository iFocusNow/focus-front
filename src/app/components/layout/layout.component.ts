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
    private notificationService: NotificationsService
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
        console.log(this.children);
        this.children?.forEach(((child)=>{
          console.log(child.id);
          this.notificationService.getChildAlert(child.id!).subscribe(
            (data: Alert[]) => {
              data.forEach((element:Alert) => {
                console.log(element);
                this.alertas.push(this.getAlertMessage(element));
                console.log(this.alertas);
              })
            }
          )
          }))
      });
  }

  showNotification() {
    this.visibleNotifications = !this.visibleNotifications;
  }

  getAlertMessage(alert: Alert): string {
    switch (alert.type) {
      case "BLOCK_ENTRY":
        return 'Su hijo(a) ha querido entrar a una aplicación bloqueada.';
      case 'SOLICIT_UNBLOCK':
        return 'Su hijo(a) ha solicitado un desbloqueo de aplicación.';
      case 'PHONE_TIME_EXCEEDED':
        return 'Su hijo(a) ha superado el tiempo en pantalla.';
      default:
        return '';
    }
  }


}

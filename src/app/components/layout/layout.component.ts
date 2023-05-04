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
  parent_id = 1;
  children: Child[] | undefined;
  visibleNotifications = false;
  sizeNotification = 20;
  alerts: Alert[] | undefined;
  formattedAlerts: { message: string, type: string }[] = [];

  constructor(private childService: ChildService, private router: Router, private notificationService: NotificationsService) {}

  ngOnInit(): void {
    this.getParentChildren();
    this.getNotifications();
  }

  onNavigate(route: string): void {
    this.router.navigate([route]);
  }

  onNavigateChild(childId: number): void {
    this.router.navigate(['/child', childId]);
  }

  getParentChildren() {
    this.childService
      .getParentChildren(this.parent_id)
      .subscribe((response: any) => {
        this.children = response;
      });
  }

  showNotification(){
    this.visibleNotifications =!this.visibleNotifications;
  }

  getAlertMessage(alert: Alert): string {
    switch (alert.type) {
      case 'block_entry':
        return 'Su hijo(a) ha querido entrar a una aplicación bloqueada.';
      case 'solicit_unblock':
        return 'Su hijo(a) ha solicitado un desbloqueo de aplicación.';
      case 'phone_time_exceeded':
        return 'Su hijo(a) ha superado el tiempo en pantalla.';
      default:
        return '';
    }
  }
  
  getNotifications(){
    this.notificationService
      .getParentAlert(this.parent_id)
      .subscribe((response: any) => {
        this.alerts = response;        
      });
      
  }

}

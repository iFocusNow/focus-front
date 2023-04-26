import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private router: Router) {}

  onNavigate(route: string): void {
    this.router.navigate([route]);
  }

  // TODO: Change to UUID with Spring Backend
  onNavigateChild(childId: number): void {
    this.router.navigate(['/child', childId]);
  }
}

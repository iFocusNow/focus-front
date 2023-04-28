import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  childIds: number[] = [1, 2, 3];

  constructor(private router: Router) {}

  onNavigate(route: string): void {
    this.router.navigate([route]);
  }

  // TODO: Obtener la cantidad de hijos de un padre

  onNavigateChild(childId: number): void {
    this.router.navigate(['/child', childId]);
  }
}

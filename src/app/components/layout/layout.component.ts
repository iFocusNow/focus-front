import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Child } from 'src/app/models/child';
import { ChildService } from 'src/app/services/child.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  parent_id = 1;
  children: Child[] | undefined;

  constructor(private childService: ChildService, private router: Router) {}

  ngOnInit(): void {
    this.getParentChildren();
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
}

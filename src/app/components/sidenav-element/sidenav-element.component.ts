import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-element',
  templateUrl: './sidenav-element.component.html',
  styleUrls: ['./sidenav-element.component.scss'],
})
export class SidenavElementComponent {
  @Input() title!: string;
  @Input() icon!: string;

  constructor() {}
}

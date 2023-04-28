import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  constructor() {}

  // Pasarlos en el selector
  // Si se detecta cierta opcion en el selector, filtrar el appDevices y el linkDevices por device_id
  // Pasar los argumentos de devices y links a hijos
}

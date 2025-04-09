import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mi-app';
}

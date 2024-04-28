import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

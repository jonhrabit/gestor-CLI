import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthService } from './seguranca/auth.service';
import { UsuarioService } from './seguranca/services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    AuthService,
    UsuarioService
  ]
})
export class AppComponent {
  title = 'gestor';
}

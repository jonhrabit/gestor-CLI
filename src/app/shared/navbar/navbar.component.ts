import { Component } from '@angular/core';
import { BootstrapModule } from '../../bootstrap.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Usuario } from '../../auth/usuario';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, BootstrapModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  collapsed = true;
  usuario: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  doLogout() {
    this.usuario = '';
    this.authService.logout();
    this.router.navigate(['/login', 'logout']);
  }

  isAutenticado(): any {
    return true;
  }
}

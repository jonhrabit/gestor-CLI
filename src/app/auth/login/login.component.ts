import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { apiURL } from '../../app.config';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../util/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: FormControl = new FormControl(['']);
  senha: FormControl = new FormControl(['']);

  constructor(
    private httpCliente: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    if (this.router.url === '/login/logout') {
      this.toastService.showSuccess("Logout realizado com sucesso.");
    }
  }
  send() {
    let body = new URLSearchParams();
    body.set('username', this.usuario.value);
    body.set('password', this.senha.value);

    this.httpCliente
      .post(`${apiURL}/login`, body.toString(), {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        responseType: 'text',
      })
      .subscribe({
        next: (token) => {
          this.authService.setToken(token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastService.showDanger('Usuário ou senha incorretos.');
        },
        complete: () => {},
      });
  }
}

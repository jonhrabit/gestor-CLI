import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { apiURL } from '../../app.config';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: FormControl = new FormControl(['']);
  senha: FormControl = new FormControl(['']);
  msg: string;

  constructor(
    private httpCliente: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.activatedRoute.snapshot.paramMap.get('msg');
    this.msg = '';
  }
  ngOnInit(): void {
    this.msg = '';
    if (this.router.url === '/login/logout') {
      console.log('Logout efetuado com sucesso.');
    }
  }
  send() {
    let body = new URLSearchParams();
    body.set('username', this.usuario.value);
    body.set('password', this.senha.value);

    console.log(body.toString());

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
          console.log('Usuário ou senha incorretos.');
        },
      });
  }
}

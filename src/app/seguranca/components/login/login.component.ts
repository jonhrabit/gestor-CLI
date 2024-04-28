import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { apiURL } from '../../../app.config';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  usuario: string;
  senha: string;
  msg: string;

  constructor(
    private httpCliente: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.snapshot.paramMap.get("msg");
    this.usuario = "";
    this.senha = "";
    this.msg = "";
  }
  ngOnInit(): void {
    this.msg = "";
    if (this.router.url === '/login/logout') {
      this.openSnackBar("Logout efetuado com sucesso.", "x")
    }
  }
  send() {

    let body = new URLSearchParams();
    body.set("username",this.usuario);
    body.set("password",this.senha);
    
    this.httpCliente.post(`${apiURL}/login`, body.toString(),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        responseType:"text"
      }
    ).subscribe(
      resultado => {
        this.authService.setToken(resultado);
        this.router.navigate(['/home']);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
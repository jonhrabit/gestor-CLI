import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-altararsenha',
  standalone: true,
  imports: [HttpClientModule, MaterialModule],
  templateUrl: './altararsenha.component.html',
  styleUrl: './altararsenha.component.scss',
})
export class AltararsenhaComponent {
  alterar() {
    console.log('ola');
  }
  senhaAntiga!: String;
  senhaNova!: String;
  senhaNovaRepetida!: String;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  alterarSenha() {
    if (this.senhaNova == this.senhaNovaRepetida) {
      this.http
        .post(
          'http://localhost:8080/alterarsenha',
          {
            id: sessionStorage.getItem('JSESSIONID'),
            senhaAtual: this.senhaAntiga,
            novaSenha: this.senhaNova,
          },
          { headers: this.authService.getHeaders(), responseType: 'text' }
        )
        .subscribe((resposta) => {
          console.log(resposta);
          this.openSnackBar('Senha alterada com sucesso', 'x');
        });
    } else {
      this.openSnackBar('Senhas novas não conferem.', 'x');
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-altararsenha',
  standalone: true,
  imports: [HttpClientModule, MaterialModule],
  templateUrl: './altararsenha.component.html',
  styleUrl: './altararsenha.component.scss',
})
export class AltararsenhaComponent {
  usuario!: Usuario;
  senhaAntiga!: String;
  senhaNova!: String;
  senhaNovaRepetida!: String;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) {
    let usuarioId = sessionStorage.getItem('usrd');
    if (usuarioId != null) {
      usuarioService.get(+usuarioId).subscribe((resp) => {
        this.usuario = resp;
      });
    }
  }

  alterarSenha() {
    if (this.senhaNova == this.senhaNovaRepetida) {
      this.http
        .post(
          'http://localhost:8080/alterarsenha',
          {
            id: sessionStorage.getItem('usrd'),
            senhaAtual: this.senhaAntiga,
            novaSenha: this.senhaNova,
          },
          { headers: this.authService.getHeaders(), responseType: 'text' }
        )
        .subscribe({
          next: (resp) => {
            console.log(resp);
            this.openSnackBar('Senha alterada com sucesso', 'x');
          },
          error: (e) => this.openSnackBar("Senha antiga não confere.", 'x'),
        });
    } else {
      this.openSnackBar('Senhas novas não conferem.', 'x');
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

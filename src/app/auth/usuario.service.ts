import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { apiURL } from '../app.config';
import { Permissao } from './permissao';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getAll() {
    return this.httpClient.get<Usuario[]>(apiURL + '/usuario/all', {
      headers: this.authService.getHeaders(),
    });
  }

  getPermissoes() {
    return this.httpClient.get<any>(apiURL + '/usuario/permissoes', {
      headers: this.authService.getHeaders(),
    });
  }
  get(id: number) {
    return this.httpClient.get<Usuario>(apiURL + '/usuario/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
  resetSenha(id: number) {
    return this.httpClient.get<string>(apiURL + '/usuario/reset/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
  salvar(usuario: Usuario, id: number) {
    const headers = this.authService.getHeaders();
    return this.httpClient.put<Usuario>(apiURL + '/usuario/' + id, usuario, {
      headers: headers,
    });
  }

  criar(usuario: Usuario) {
    const headers = this.authService.getHeaders();
    return this.httpClient.post<Usuario>(apiURL + '/usuario', usuario, {
      headers: headers,
    });
  }

  deletar(usuario: Usuario) {
    const headers = this.authService.getHeaders();
    return this.httpClient.delete<boolean>(apiURL + '/usuario/' + usuario.id, {
      headers: headers,
    });
  }

  alterarsenha(alterarSenha: any) {
    const headers = this.authService.getHeaders();
    return this.httpClient.post<string>(
      apiURL + '/usuario/alterarsenha',
      alterarSenha,
      {
        headers: headers,
      }
    );
  }
}

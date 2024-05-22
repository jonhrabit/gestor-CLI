import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { apiURL } from '../app.config';

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
  getPermissoesList() {
    /*     return this.httpClient.get<Usuario[]>(apiURL + '/usuario/permissaoList', {
      headers: this.authService.getHeaders(),
    }); */
    return [
      { nome: 'ADMIN', texto: 'Controle de usuários.' },
      { nome: 'VIGILANCIA', texto: 'Efetividade da vigilância.' },
      {
        nome: 'VIGDELETE',
        texto: 'Deletar registros da efetividade da vigilância.',
      },
      {
        nome: 'REST',
        texto: 'Habilita os comandos REST para diversos resources.',
      },
      { nome: 'AGENTES', texto: 'Agentes' },
      { nome: 'CLAVICULARIO', texto: 'Claviculário' },
      {
        nome: 'CLAVICULARIODELETE',
        texto: 'Deletar registros no claviculário',
      },
      { nome: 'GUARITA', texto: 'Guarita' },
    ];
  }
  get(id: number) {
    return this.httpClient.get<Usuario>(apiURL + '/usuario/' + id, {
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
}

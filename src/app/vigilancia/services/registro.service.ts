import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { apiURL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../seguranca/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  url = '/vigilancia/registro';
  getAll() {
    return this.httpClient.get<Registro[]>(apiURL + this.url + '/all', {
      headers: this.authService.getHeaders(),
    });
  }
  get(id: number) {
    return this.httpClient.get<Registro>(apiURL + this.url + '/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
  salvar(registro: Registro, id: number) {
    return this.httpClient.put<Registro>(
      apiURL + this.url + '/' + id,
      registro,
      { headers: this.authService.getHeaders() }
    );
  }
  criar(registro: Registro) {
    return this.httpClient.post<Registro>(apiURL + this.url + '/', registro, {
      headers: this.authService.getHeaders(),
    });
  }
  deletar(id: number) {
    return this.httpClient.delete<Registro>(apiURL + this.url + '/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
  getByVigilante(nomeVigilante: string) {
    return this.getAll().pipe(
      map((reg) => reg.filter((r) => r.vigilante == nomeVigilante))
    );
  }
}

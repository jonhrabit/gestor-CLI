import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { apiURL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

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
  getByDia(dia: number, mes: number, ano: number) {
    return this.httpClient.get<Registro[]>(
      apiURL + this.url + '/' + ano + '/' + mes + '/' + dia,
      {
        headers: this.authService.getHeaders(),
      }
    );
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
  criar(registros: Registro[]) {
    return this.httpClient.post<Registro>(apiURL + this.url, registros, {
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

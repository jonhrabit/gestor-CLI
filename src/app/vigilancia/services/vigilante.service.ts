import { Injectable } from '@angular/core';
import { Vigilante } from '../models/vigilante';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../app.config';
import { VigilanteDetalhes } from '../models/vigilantedetalhes';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VigilanteService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getAll() {
    return this.httpClient.get<Vigilante[]>(
      apiURL + '/vigilancia/vigilante/all',
      {
        headers: this.authService.getHeaders(),
      }
    );
  }

  get(id: number) {
    return this.httpClient.get<Vigilante>(
      apiURL + '/vigilancia/vigilante/' + id,
      {
        headers: this.authService.getHeaders(),
      }
    );
  }

  getDetalhes(id: number) {
    return this.httpClient.get<VigilanteDetalhes>(
      apiURL + '/vigilancia/vigilante/detalhes/' + id,
      {
        headers: this.authService.getHeaders(),
      }
    );
  }
  salvar(vigilante: Vigilante, id: number) {
    console.log('Vigilante:');
    console.log(vigilante);

    return this.httpClient.put<Vigilante>(
      apiURL + '/vigilancia/vigilante/' + id,
      vigilante,
      {
        headers: this.authService.getHeaders(),
      }
    );
  }

  criar(vigilante: Vigilante) {
    return this.httpClient.post<Vigilante>(
      apiURL + '/vigilancia/vigilante',
      vigilante,
      {
        headers: this.authService.getHeaders(),
      }
    );
  }
  deletar(id: number) {
    return this.httpClient.delete<Vigilante>(
      apiURL + '/vigilancia/vigilante/' + id,
      {
        headers: this.authService.getHeaders(),
      }
    );
  }
}

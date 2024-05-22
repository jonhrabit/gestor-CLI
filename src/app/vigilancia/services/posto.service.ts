import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posto } from '../models/posto';
import { apiURL } from '../../app.config';
import { map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostoService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  getAll() {
    return this.httpClient.get<Posto[]>(apiURL + '/vigilancia/posto/all', {
      headers: this.authService.getHeaders(),
    });
  }

  getByVigilante(id: number) {
    return this.getAll().pipe(map(postos=>postos.filter(postos=>postos.vigilante.id==id)));
  }

  get(id: number) {
    return this.httpClient.get<Posto>(apiURL + '/vigilancia/posto/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
  salvar(posto: Posto, id: number) {
    return this.httpClient.put<Posto>(
      apiURL + '/vigilancia/posto/' + id,
      posto,
      {
        headers: this.authService.getHeaders(),
      }
    );
  }

  criar(posto: Posto) {
    return this.httpClient.post<Posto>(apiURL + '/vigilancia/posto', posto, {
      headers: this.authService.getHeaders(),
    });
  }
  deletar(id: number) {
    return this.httpClient.delete<Posto>(apiURL + '/vigilancia/posto/' + id, {
      headers: this.authService.getHeaders(),
    });
  }
}

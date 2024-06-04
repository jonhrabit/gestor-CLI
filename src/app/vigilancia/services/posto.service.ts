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
    })
    ;
  }

  getAtivos() {
    return this.getAll().pipe(
      map((postos) => postos.filter((postos) => postos.ativo))
    );
  }
  getByGrupo(grupo: string) {
    return this.getAtivos().pipe(
      map((postos) => postos.filter((p) => p.grupo == grupo))
    );
  }

  getGrupos() {
    return this.getAtivos().pipe(
      map((postos) => {
        let grupos: string[] = [];
        postos.forEach((posto) => {
          if (grupos.indexOf(posto.grupo) == -1) {
            grupos.push(posto.grupo);
          }
        });
        return grupos;
      })
    );
  }

  getByVigilante(id: number) {
    return this.getAll().pipe(
      map((postos) => postos.filter((postos) => postos.vigilanteId == id))
    );
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

  criar(posto: Posto[]) {
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

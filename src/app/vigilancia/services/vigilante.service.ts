import { Injectable } from '@angular/core';
import { Vigilante } from '../models/vigilante';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../seguranca/auth.service';
import { apiURL } from '../../app.config';

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
  salvar(vigilante: Vigilante, id: number) {
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

  cpf(valor: string) {
    //https://gist.github.com/fernandovaller/b10a3be0e7b3b46e5895b0f0e75aada5
    valor = valor.replace(/\D/g, ''); //Remove tudo o que não é dígito
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return valor;
  }
}

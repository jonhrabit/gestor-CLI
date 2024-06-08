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

  getListaStatus() {
    return [
      {
        nome: 'A',
        descricao: 'Posto ativo',
        texto: 'Posto corretamente coberto',
      },
      {
        nome: 'ATRASO',
        descricao: 'Descumprimento de Horário',
        texto:
          'Escrever o horário descumprido no formato 00:00 adaptado para Atraso}',
      },
      {
        nome: 'DIS',
        descricao: 'Dispensa no recesso',
        texto: 'Posto dispensado pelo gestor no recesso',
      },
      {
        nome: 'FM',
        descricao: 'Feriado municipal',
        texto: 'Informar data de feriado municipal',
      },
      {
        nome: 'FNS',
        descricao: 'Falta Não Substituída',
        texto: 'Faltas em geral com ou sem justificativa',
      },
      {
        nome: 'FCS',
        descricao: 'Falta com Substituição',
        texto: 'Faltas em que empresa disponibilizou substituto',
      },
      {
        nome: 'PD',
        descricao: 'Posto descoberto',
        texto: 'Férias, rescisão, licença maternidade - sem reposição',
      },
      {
        nome: 'RE',
        descricao: 'Rescisão com Reposição',
        texto: 'Rescisão com contratação de outro funcionário',
      },
      {
        nome: 'SAÍDA',
        descricao: 'Saída do posto antes do horário e sem cobertura.',
        texto: 'Escrever o horário descumprido no formato 00:00',
      },
      {
        nome: 'CR',
        descricao: 'Curso de reciclagem',
        texto: 'Titular em curso de reciclagem de vigilante com substituição',
      },
      { nome: 'FE', descricao: 'Férias', texto: 'Férias com substitução' },
    ];
  }
}

import { Injectable } from '@angular/core';

interface Escala {
  nome: string;
  descricao: string;
}

const escalas: Escala[] = [
  { nome: 'V848', descricao: 'Vigilante 8:48' },
  { nome: 'V12D', descricao: 'Vigilante 12x36 diurno' },
  { nome: 'V12N', descricao: 'Vigilante 12x36 noturno' },
  { nome: 'INTERMITENTE', descricao: 'Vigilante - intermitente' },
  { nome: 'SUPERVISOR', descricao: 'Vigilante - supervisor' },
  { nome: 'RA12', descricao: 'Vigilante - rendição almoço 12x36 diurno' },
  { nome: 'RA8', descricao: 'Vigilante - rendição almoço 8:48' },
  { nome: 'RN', descricao: 'Vigilante - rendição janta 12x36 noturno' },
  { nome: 'RA', descricao: 'Vigilante - rendição almoço' },
];

@Injectable({
  providedIn: 'root',
})
export class EscalaService {
  constructor() {
  }
  getAll(){
    return escalas;
  }
}

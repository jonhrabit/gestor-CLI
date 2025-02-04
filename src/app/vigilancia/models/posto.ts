import { Vigilante } from './vigilante';

export interface Posto {
  id: number;
  vigilante: Vigilante;
  escala: string;
  titularidade: string;
  local: string;
  observacao: string;
  grupo: string;
  inicio: string;
  jornada: string;
  ativo: boolean;
}

import { Posto } from '../../models/posto';

export interface Funcionario {
  id: number;
  posto?: Posto | null;
  nome: string;
  cpf: string;
  escala: string;
  titularidade: string;
  observacoes: string;
  registros: string[];
}

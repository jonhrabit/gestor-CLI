import { Posto } from "./posto";
import { Registro } from "./registro";

export interface VigilanteDetalhes {
  id: number;
  cadastro: string;
  admissao: string;
  desligamento: string;
  nome: string;
  matricula: string;
  cpf: string;
  celular: string;
  observacao: string;
  foto: string;
  ativo: boolean;
  postos:Posto[],
  substituicoes: Registro[],
  registros: Registro[]
}

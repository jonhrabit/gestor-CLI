export interface Vigilante {
  id: number;
  cadastro: Date;
  admissao: Date;
  desligamento: Date;
  nome: string;
  matricula: string;
  cpf: string;
  celular: string;
  observacao: string;
  foto: string;
  ativo: boolean;
}

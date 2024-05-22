export interface Registro {
  id: number;
  data: Date;
  registro: Date;
  posto: number;
  vigilante: string;
  escala: string;
  titularidade: string;
  substituto: number;
  nomeSubstituto: string;
  status: string;
  horario: Date;
  observacoes: string;
}

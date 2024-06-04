export interface Registro {
  id?: number;
  data: string;
  posto: number;
  status: string;
  vigilante?: string;
  escala?: string;
  titularidade?: string;
  substituto?: number;
  nomeSubstituto?: string;
  horario?: string;
  observacoes?: string;
  registro?: string;
}

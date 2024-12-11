import { Aluno } from "./aluno";

export interface Imc {
  imcId?: string;
  altura: string;
  peso: string;
  classificacao: number;
  faixa: string;
  alunoId: number;
  criadoEm?: string;
  aluno?: Aluno;
}

import { Injectable } from '@angular/core';
import { PostoService } from './posto.service';
import { VigilanteService } from './vigilante.service';
import { Posto } from '../models/posto';
import { Vigilante } from '../models/vigilante';
import { Funcionario } from '../import/model/funcionario';
import { DatasService } from '../../util/datas.service';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  LINHA = 19;
  LIMITE_LINHA = 'Observações';

  postos: Posto[] = [];
  vigilantes: Vigilante[] = [];
  escalas: any;

  constructor(
    private postoService: PostoService,
    private vigilanteService: VigilanteService
  ) {
    this.postoService.getAll().subscribe({
      next: (data) => {
        this.postos = data;
      },
    });
    this.vigilanteService.getAll().subscribe({
      next: (data) => {
        this.vigilantes = data;
      },
    });
    this.postoService.getEscalas().subscribe({
      next: (data) => {
        this.escalas = data;
      },
    });
  }

  getLastColuna(data: any[]) {
    let i = 0;
    while (data[this.LINHA][i] != this.LIMITE_LINHA && i < 45) {
      i++;
    }
    return i;
  }

  readTabela(data: any[]): Funcionario[] {
    let funcionarios: Funcionario[] = [];
    let dias = this.getLastColuna(data);
    let i = 0;
    i = this.LINHA + 1;
    while (data[i][0] != undefined && i < 220) {
      let registros = [];

      for (let coluna = 4; coluna < dias; coluna++) {
        if (data[i][coluna] == undefined) {
          registros.push('');
        } else {
          registros.push(data[i][coluna]);
        }
      }

      let funcionario: Funcionario = {
        id: i,
        nome: data[i][0],
        cpf: data[i][1],
        escala: this.getEscala(data[i][2]),
        titularidade: data[i][3].toUpperCase(),
        observacoes: data[i][dias],
        registros: registros,
      };
      funcionarios.push(funcionario);
      i++;
    }
    console.log(funcionarios);
    return funcionarios;
  }
  getVigilante(funcionario: Funcionario): Vigilante {
    let vigilante = this.vigilantes.filter(
      (vig) =>
        vig.nome.toUpperCase().trim() == funcionario.nome.toUpperCase().trim()
    );
    if (vigilante.length <= 0) {
      throw new Error('Não localizado');
    }
    return vigilante[0];
  }

  getPosto(funcionario: Funcionario): Posto {
    let postosFuncionario: Posto[] = this.postos.filter((p) => {
      return (
        p.vigilanteNome?.trim() == funcionario.nome.trim() &&
        ((p.titularidade.toLowerCase().trim() == 'titular' &&
          p.escala == funcionario.escala) ||
          (p.titularidade.toLowerCase().trim() == 'substituto' &&
            p.escala == 'INTERMITENTE'))
      );
    });
    if (postosFuncionario.length <= 0) {
      throw new Error('Não localizado');
    }
    return postosFuncionario[0];
  }

  async obterPostos(funcionarios: Funcionario[]) {
    funcionarios.forEach((funcionario) => {
      let vigilante!: Vigilante;
      let postosFuncionario: Posto[] = this.postos.filter((p) => {
        return (
          p.vigilanteNome?.trim() == funcionario.nome.trim() &&
          ((p.titularidade.toLowerCase().trim() == 'titular' &&
            p.escala == funcionario.escala) ||
            (p.titularidade.toLowerCase().trim() == 'substituto' &&
              p.escala == 'INTERMITENTE'))
        );
      });
      if (postosFuncionario.length <= 0) {
        console.log('Não localizado ' + funcionario.nome);
        //posto não localizado
        if (
          this.vigilantes.filter(
            (vig) =>
              vig.nome.toUpperCase().trim() ==
              funcionario.nome.toUpperCase().trim()
          ).length <= 0
        ) {
          // vigilante nao localizado
          this.vigilanteService
            .criar({
              id: 0,
              nome: funcionario.nome,
              cpf: funcionario.cpf,
              cadastro: new Date(),
              ativo: true,
            })
            .subscribe({
              next: (data) => {
                vigilante = data;
              },
              error: (erro) => {
                console.error(erro);
              },
              complete: () => {
                let escala = funcionario.escala;
                if (funcionario.titularidade == 'SUBSTITUTO') {
                  escala = 'INTERMITENTE';
                }
                this.postoService
                  .criar([
                    {
                      id: 0,
                      vigilanteId: vigilante.id,
                      vigilanteNome: vigilante.nome,
                      escala: escala,
                      titularidade: funcionario.titularidade,
                      grupo: 'autogerado2',
                      ativo: true,
                    },
                  ])
                  .subscribe({
                    next: (data) => {
                      funcionario.posto = data;
                    },
                    error: (erro) => {
                      console.error(erro);
                    },
                    complete: () => {},
                  });
              },
            });
        }
        console.log('Criando substituto Intermitente');

        this.postoService.criar([
          {
            id: 0,
            vigilanteId: vigilante.id,
            vigilanteNome: vigilante.nome,
            escala: 'INTERMITENTE',
            titularidade: 'SUBSTITUTO',
            grupo: 'autogerado2',
            ativo: true,
          },
        ]);
      } else {
        funcionario.posto = postosFuncionario[0];
      }
    });
  }

  funcionariosToRegistros(
    funcionarios: Funcionario[],
    mes: number,
    ano: number
  ): Registro[] {
    let registros: Registro[] = [];
    let erros: Registro[] = [];
    funcionarios.forEach((funcionario) => {
      funcionario.registros.forEach((reg, i) => {
        let postoId = funcionario.posto?.id;
        if (postoId != undefined) {
          switch (reg) {
            case '':
              break;
            case 'FCS':
              erros.push({
                data: DatasService.dateToBr(new Date(ano, mes, i)),
                posto: postoId,
                vigilante: funcionario.posto?.vigilanteNome,
                status: reg,
              });
              break;
            default:
              registros.push({
                data: DatasService.dateToBr(new Date(ano, mes, i)),
                posto: postoId,
                vigilante: funcionario.posto?.vigilanteNome,
                status: reg,
              });
              break;
          }
        } else {
          erros.push({
            data: DatasService.dateToBr(new Date(ano, mes, i)),
            posto: 0,
            vigilante: funcionario.posto?.vigilanteNome,
            status: reg,
          });
        }
      });
    });
    console.log(registros);
    console.log(erros);
    return registros;
  }

  getEscala(valor: string) {
    let escala = 'V848';
    for (let prop in this.escalas) {
      if (this.escalas[prop] == valor) {
        escala = prop;
      }
    }
    return escala;
  }
}

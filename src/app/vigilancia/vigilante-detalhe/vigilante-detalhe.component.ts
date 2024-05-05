import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { TabelaComponent } from '../../shared/tabela/tabela.component';
import { Posto } from '../models/posto';
import { Registro } from '../models/registro';
import { VigilanteDetalhes } from '../models/vigilantedetalhes';
import { VigilanteService } from '../services/vigilante.service';

@Component({
  selector: 'app-vigilante-detalhe',
  standalone: true,
  templateUrl: './vigilante-detalhe.component.html',
  styleUrl: './vigilante-detalhe.component.scss',
  imports: [MaterialModule, TabelaComponent],
})
export class VigilanteDetalheComponent implements OnInit {
  vigilanteForm!: FormGroup;
  id!: any;
  nome!: any;
  public registros!: any;
  public postos!: any;
  public substituicoes!: any;
  vigilanteDetalhes!: VigilanteDetalhes;
  new: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private vigilanteService: VigilanteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vigilanteForm = this.formBuilder.group({
      id: [null],
      cadastro: [null],
      admissao: [null],
      desligamento: [null],
      nome: [''],
      matricula: [''],
      cpf: [''],
      celular: [''],
      observacao: [''],
      foto: [''],
      ativo: false,
      postos: [''],
      substituicoes: [''],
      registros: [''],
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id != null) {
      if (+this.id != 0) {
        this.vigilanteService.getDetalhes(+this.id).subscribe({
          next: (data) => {
            this.vigilanteDetalhes = data;
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Vigilante não localizado.', 'Fechar');
          },
          complete: () => {
            this.vigilanteForm.setValue(this.vigilanteDetalhes);
            this.registros = new MatTableDataSource<Registro>(
              this.vigilanteDetalhes.registros
            );
            this.postos = new MatTableDataSource<Posto>(
              this.vigilanteDetalhes.postos
            );
            this.substituicoes = new MatTableDataSource<Posto>(
              this.vigilanteDetalhes.substituicoes
            );
          },
        });
      }
    }
  }

  send(): void {
    let vigilante = this.vigilanteForm.value;
    if (vigilante.id == null) {
      this.vigilanteService.criar(vigilante).subscribe({
        next: (data) =>
          this.snackBar.open('Vigilante criado com sucesso.', 'Fechar'),
        error: (error) => {
          console.error(error);
          this.snackBar.open(
            'Erro ao tentar salvar o novo vigilante.',
            'Fechar'
          );
        },
      });
    } else {
      this.vigilanteService.salvar(vigilante, vigilante.id).subscribe({
        next: (data) =>
          this.snackBar.open('Vigilante salvo com sucesso.', 'Fechar'),
        error: (error) => {
          console.error(error);
          this.snackBar.open(
            'Erro ao tentar salvar o novo vigilante.',
            'Fechar'
          );
        },
      });
    }
  }

  getPosto(id: number) {
    console.log('getPosto(' + id + ')');
  }

  deletePosto(id: number) {
    console.log('deletePosto(' + id + ')');
  }
}

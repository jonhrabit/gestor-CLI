import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VigilanteService } from '../services/vigilante.service';
import moment from 'moment';

@Component({
  selector: 'app-vigilante-detalhe',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './vigilante-detalhe.component.html',
  styleUrl: './vigilante-detalhe.component.css',
})
export class VigilanteDetalheComponent implements OnInit {
  vigilanteForm!: FormGroup;

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
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      if (+id != 0) {
        this.vigilanteService.get(+id).subscribe({
          next: (data) => {
            this.vigilanteForm.setValue(data);
            this.vigilanteForm
              .get('cadastro')
              ?.setValue(moment(this.vigilanteForm.get('cadastro')?.value).format("DD/MM/YYYY"));
            this.vigilanteForm
              .get('admissao')
              ?.setValue(moment(this.vigilanteForm.get('admissao')?.value));
            this.vigilanteForm
              .get('desligamento')
              ?.setValue(moment(this.vigilanteForm.get('desligamento')?.value));
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Vigilante não localizado.', 'Fechar');
          },
        });
      }
    }
  }
  onSubmit(): void {
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
}

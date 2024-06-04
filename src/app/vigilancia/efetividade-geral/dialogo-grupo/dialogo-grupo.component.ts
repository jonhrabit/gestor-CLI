import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostoService } from '../../services/posto.service';
import { ToastService } from '../../../util/toast/toast.service';
import { map } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Posto } from '../../models/posto';

@Component({
  selector: 'app-dialogo-grupo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialogo-grupo.component.html',
  styleUrl: './dialogo-grupo.component.scss',
})
export class DialogoGrupoComponent implements OnInit {
  formGrupos!: FormGroup;
  @Input() valueDia!: string;
  @Output() criar = new EventEmitter<Posto[]>();
  grupos: string[] = [];

  constructor(
    private postoService: PostoService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.postoService.getGrupos().subscribe({
      next: (data) => {
        this.grupos = data;
      },
      error: (erro) => {
        this.toastService.showDanger('ERRO: ' + erro);
      },
      complete: () => {
        this.formGrupos = this.formBuilder.group(this.criarGruposObjeto());
      },
    });
  }

  private criarGruposObjeto() {
    let texto = '';
    this.grupos.forEach((g, i) => {
      let controle = '"' + g + '":false';
      if (i == 0) {
        texto = controle;
      } else {
        texto = texto + ',' + controle;
      }
    });
    texto = '{' + texto + '}';
    return JSON.parse(texto);
  }

  listaVigilantes(grupo: string, limit: number) {
    let vigs: string[] = [];
    if (grupo != '') {
      this.postoService
        .getByGrupo(grupo)
        .pipe(map((postos) => postos.map((p) => p.vigilanteNome)))
        .subscribe({
          next: (data) => {
            vigs = data;
          },
          error: (erro) => this.toastService.showDanger(erro),
          complete: () => {
            let texto = '';
            vigs
              .filter((v, index) => index < limit)
              .forEach((v, index) => {
                let i = index + 1;
                texto = texto + '<div>' + i + '. ' + v + '</div>';
                if (index == limit - 1) {
                  texto = texto + '<div>(...)</div>';
                }
              });
            this.toastService.show(texto);
          },
        });
    }
  }

  send() {
    let lista: Posto[] = [];
    let todosPostos: Posto[];
    this.postoService.getAtivos().subscribe({
      next: (data) => {
        todosPostos = data;
      },
      error: (erro) => {
        console.error(erro);
        this.toastService.showDanger(erro);
      },
      complete: () => {
        const valores = this.formGrupos.value;
        Object.keys(valores).forEach((key) => {
          if (valores[key]) {
            const grupo = todosPostos.filter(
              (posto) => posto.grupo == key && posto.titularidade == 'TITULAR'
            );
            lista = lista.concat(grupo);
          }
        });
        this.criar.emit(lista);
        this.activeModal.dismiss();
      },
    });
  }
}

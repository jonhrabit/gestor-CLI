import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbDatepickerModule,
  NgbModal,
  NgbNavModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { VigilanteService } from '../services/vigilante.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatasService } from '../../util/datas.service';
import { VigilanteDetalhes } from '../models/vigilantedetalhes';
import { CpfService } from '../../util/cpf.service';
import { StatusComponent } from '../../util/status/status.component';
import { Toasts } from '../../util/toast/toast/toast.component';
import { ToastService } from '../../util/toast/toast.service';
import { PostoDialogoComponent } from '../posto/posto-dialogo/posto-dialogo.component';
import { Posto } from '../models/posto';

@Component({
  selector: 'app-vigilante-detalhe',
  standalone: true,
  templateUrl: './vigilante-detalhe.component.html',
  styleUrl: './vigilante-detalhe.component.scss',
  imports: [
    CommonModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    StatusComponent,
    Toasts,
  ],
})
export class VigilanteDetalheComponent implements OnInit {
  vigilanteForm!: FormGroup;
  vigilante!: VigilanteDetalhes;
  page = 1;
  page2 = 1;
  new: any;

  toastService = inject(ToastService);

  constructor(
    private vigilanteService: VigilanteService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.vigilanteForm = this.formBuilder.group({
      id: [null],
      cadastro: [null],
      admissao: [null],
      desligamento: [null],
      nome: ['', Validators.required],
      matricula: [''],
      cpf: ['', Validators.required],
      celular: [''],
      observacao: [''],
      foto: [''],
      ativo: false,
      postos: [''],
      substituicoes: [''],
      registros: [''],
    });

    if (id != null) {
      if (+id != 0) {
        this.vigilanteService.getDetalhes(+id).subscribe({
          next: (data) => {
            this.vigilante = data;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            this.vigilanteForm.setValue(this.vigilante);
            this.vigilanteForm.patchValue({
              admissao: DatasService.brToInput(this.vigilante.admissao),
              desligamento: DatasService.brToInput(this.vigilante.desligamento),
              cpf: CpfService.toDot(this.vigilante.cpf),
            });
          },
        });
      }
    }
  }
  send() {
    if (this.vigilanteForm.valid) {
      let vig = this.vigilanteForm.value;
      vig.cadastro = null;
      vig.cpf = CpfService.removeMask(vig.cpf);
      if (this.vigilanteForm.get('id') != null) {
        this.vigilanteService.salvar(vig, vig.id).subscribe({
          error: (erro) => {
            this.toastService.showDanger('Erro durante o salvamento');
          },
          complete: () => {
            this.toastService.showSuccess('Vigilante salvo com sucesso.');
          },
        });
      }
    }else{
      this.toastService.showDanger("Informe os campos obrigatórios.")
    }
  }
  gerarPosto() {
    const modal = this.modalService.open(PostoDialogoComponent);
    modal.componentInstance.vigilanteId = this.vigilante.id;
  }
  editarPosto(item: Posto) {
    const modal = this.modalService.open(PostoDialogoComponent);
    modal.componentInstance.postoId = item.id;
  }
}

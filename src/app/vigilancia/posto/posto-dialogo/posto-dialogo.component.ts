import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Posto } from '../../models/posto';
import { VigilanteService } from '../../services/vigilante.service';
import { PostoService } from '../../services/posto.service';
import { Vigilante } from '../../models/vigilante';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { ToastService } from '../../../util/toast/toast.service';
import { SelectEscalaComponent } from '../../util/selects/select-escala.component';
import { SelectTitularidadeComponent } from '../../util/selects/select-titularidade.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posto-dialogo',
  standalone: true,
  imports: [
    NgbTypeaheadModule,
    ReactiveFormsModule,
    SelectEscalaComponent,
    SelectTitularidadeComponent,
    CommonModule,
  ],
  templateUrl: './posto-dialogo.component.html',
  styleUrl: './posto-dialogo.component.scss',
})
export class PostoDialogoComponent implements OnInit {
  postoForm!: FormGroup;
  @Input() postoId?: number;
  @Input() vigilanteId?: number;
  listaVigilantes!: Vigilante[];
  vigilanteNome(v: Vigilante) {
    return v.nome;
  }

  constructor(
    public postoActiveModal: NgbActiveModal,
    private vigilanteService: VigilanteService,
    private postoService: PostoService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    vigilanteService
      .getAll()
      .pipe(map((vigilantes) => vigilantes.filter((vig) => vig.ativo)))
      .subscribe({
        next: (data) => {
          this.listaVigilantes = data;
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {},
      });
  }
  ngOnInit(): void {
    this.postoForm = this.fb.group({
      id: [null],
      vigilante: [null, Validators.required],
      escala: ['', Validators.required],
      titularidade: ['', Validators.required],
      local: [''],
      observacao: [''],
      grupo: [''],
      inicio: [''],
      jornada: [''],
      ativo: [true],
    });
    if (this.vigilanteId) {
      this.vigilanteService.get(this.vigilanteId).subscribe({
        next: (data) => {
          this.postoForm.get('vigilante')?.setValue(data);
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {},
      });
    }

    if (this.postoId) {
      this.postoService.get(this.postoId).subscribe({
        next: (data) => {
          this.populateForm(data);
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {},
      });
    }
  }
  populateForm(posto: Posto): void {
    let vigilante!: Vigilante;
    this.vigilanteService.get(posto.vigilanteId).subscribe({
      next: (data) => {
        vigilante = data;
      },
      error: (erro) => {
        console.error(erro);
        this.toastService.showDanger(erro);
      },
      complete: () => {
        this.postoForm.patchValue({
          id: posto.id,
          vigilante: vigilante,
          escala: posto.escala,
          titularidade: posto.titularidade,
          local: posto.local,
          observacao: posto.observacao,
          grupo: posto.grupo,
          inicio: posto.inicio,
          jornada: posto.jornada,
          ativo: posto.ativo,
        });
      },
    });
  }
  onSubmit() {
    if (this.postoForm.valid) {
      let posto = this.getPosto();

      if (posto.id == null) {
        this.postoService.criar([posto]).subscribe({
          next: (data) => {},
          error: (erro) => {
            console.error(erro);
            this.toastService.showDanger(erro);
          },
          complete: () => {
            this.toastService.showSuccess('Posto salvo com sucesso.');
            this.postoActiveModal.dismiss();
          },
        });
      } else {
        this.postoService.salvar(posto, posto['id']).subscribe({
          next: (data) => {},
          error: (erro) => {
            console.error(erro);
            this.toastService.showDanger(erro);
          },
          complete: () => {
            this.toastService.showSuccess('Posto salvo com sucesso.');
            this.postoActiveModal.dismiss();
          },
        });
      }
    } else {
      this.toastService.showDanger(
        'O posto deve conter no mínimo um vigilante, a escala e a titularidade.'
      );
    }
  }
  search: OperatorFunction<string, readonly Vigilante[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.listaVigilantes
              .filter(
                (v) => v.nome.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );
  private getPosto() {
    let formulario = this.postoForm.value;
    let posto = '{';
    Object.keys(formulario).forEach((key, index) => {
      if (formulario[key] != null && formulario[key] != '') {
        if (key == 'vigilante') {
          posto += '"vigilanteId":"' + formulario[key]['id'] + '",';
        } else {
          posto += '"' + key + '":"' + formulario[key] + '",';
        }
      }
    });
    posto = posto.slice(0, -1);
    posto += '}';
    return JSON.parse(posto);
  }
}

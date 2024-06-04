import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PostoService } from '../../services/posto.service';
import { RegistroService } from '../../services/registro.service';
import { Posto } from '../../models/posto';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from '../../../util/toast/toast.service';
import { Registro } from '../../models/registro';
import { DatasService } from '../../../util/datas.service';

@Component({
  selector: 'app-dialogo-registro',
  standalone: true,
  imports: [NgbTypeaheadModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialogo-registro.component.html',
  styleUrl: './dialogo-registro.component.scss',
})
export class DialogoRegistroComponent implements OnInit {
  lista!: Posto[];
  @Input() registro?: Registro;
  @Input() valueDia?: string;
  @Input() idRegistro?: number;

  formPosto: FormGroup = this.formBuilder.group({
    id: [this.registro?.id],
    data: [''],
    posto: [''],
    substituto: [''],
    status: [''],
    horario: [''],
    observacoes: [''],
  });
  salvar() {

    let reg: Registro = {
      data: DatasService.inputToBr(this.formPosto.get('data')?.value),
      posto: this.formPosto.get('posto')?.value.id,
      status: this.formPosto.get('status')?.value,
    };

    console.log(reg);
    let registros: Registro[] = [];
    registros.push(reg);

    this.registroService.criar(registros).subscribe({
      error: (erro) => {
        console.error(erro);
        this.toastService.showDanger(erro);
      },
      complete: () => {},
    });

    console.log(this.formPosto.value);
  }

  search: OperatorFunction<string, readonly Posto[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.lista
              .filter(
                (v) =>
                  v.vigilanteNome.toLowerCase().indexOf(term.toLowerCase()) >
                    -1 && v.titularidade == 'TITULAR'
              )
              .slice(0, 10)
      )
    );
  substituto: OperatorFunction<string, readonly Posto[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.lista
              .filter(
                (v) =>
                  v.vigilanteNome.toLowerCase().indexOf(term.toLowerCase()) >
                    -1 && v.titularidade != 'TITULAR'
              )
              .slice(0, 10)
      )
    );

  vigilanteNome(x: Posto) {
    return x.vigilanteNome;
  }

  constructor(
    public activeModaRegistro: NgbActiveModal,
    private postosService: PostoService,
    private registroService: RegistroService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    if (this.idRegistro != null) {
      this.registroService.get(this.idRegistro).subscribe({
        next: (data) => {
          this.registro = data;
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {
          this.getRegistro();
        },
      });
    } else {
      if (this.valueDia != null) {
        this.formPosto.get('data')?.setValue(this.valueDia);
      } else {
        this.formPosto
          .get('data')
          ?.setValue(DatasService.dateToInput(new Date()));
      }
    }
    this.postosService.getAtivos().subscribe({
      next: (data) => {
        this.lista = data;
      },
      error: (erro) => {
        console.error(erro);
        this.toastService.showDanger(erro);
      },
      complete: () => {},
    });
  }

  getRegistro() {
    if (this.registro) {
      console.log(this.registro);

      let posto: Posto;
      let substituo: Posto;
      this.postosService.get(this.registro.posto).subscribe({
        next: (data) => {
          posto = data;
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {
          if (this.registro) {
            console.log(posto);

            this.formPosto.patchValue({
              id: [this.registro.id],
              data: [DatasService.brToInput(this.registro.data)],
              posto:[this.registro.vigilante],
              substituto: [this.registro.nomeSubstituto],
              status: [this.registro.status],
              horario: [this.registro.horario],
              observacoes: [this.registro.observacoes],
            });
          }
        },
      });
    }
  }
}

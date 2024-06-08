import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { PostoService } from '../../services/posto.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../util/toast/toast.service';
import { Registro } from '../../models/registro';
import { DatasService } from '../../../util/datas.service';
import { NgbActiveModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Posto } from '../../models/posto';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-dialogo',
  standalone: true,
  imports: [ReactiveFormsModule, NgbTypeaheadModule, CommonModule],
  templateUrl: './registro-dialogo.component.html',
})
export class RegistroDialogoComponent implements OnInit {
  @Input() registroId?: number;
  @Input() vigilanteId?: number;
  @Input() data?: string;
  lista!: Posto[];
  statusLista!: any;
  @Output() atualizar = new EventEmitter();

  registroForm: FormGroup = this.formBuilder.group({
    id: [null],
    data: ['', Validators.required],
    posto: ['', Validators.required],
    substituto: [''],
    status: ['', Validators.required],
    horario: [''],
    observacoes: [''],
  });

  constructor(
    private registroService: RegistroService,
    private postoService: PostoService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    public registroActiveModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    this.postoService.getAll().subscribe({
      next: (data) => {
        this.lista = data;
      },
      error: (erro) => {
        console.error(erro);
        this.toastService.showDanger(erro);
      },
    });
    this.popularForm();
    this.setData();
    this.statusLista = this.registroService.getListaStatus();
  }
  private setData() {
    if (this.data != null) {
      this.registroForm.get('data')?.setValue(this.data);
    } else {
      this.registroForm
        .get('data')
        ?.setValue(DatasService.dateToInput(new Date()));
    }
  }

  private popularForm() {
    if (this.registroId) {
      let registro: Registro;
      this.registroService.get(this.registroId).subscribe({
        next: (data) => {
          registro = data;
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {
          this.registroForm = this.formBuilder.group({
            id: [registro.id],
            data: [DatasService.brToInput(registro.data), Validators.required],
            posto: ['', Validators.required],
            substituto: [''],
            status: [registro.status, Validators.required],
            horario: [registro.horario],
            observacoes: [registro.observacoes],
          });
          this.postoService.get(registro.posto).subscribe({
            next: (data) => {
              this.registroForm.get('posto')?.setValue(data);
            },
            error: (erro) => {
              console.error(erro);
              this.toastService.showDanger(erro);
            },
          });
          if (registro.substituto) {
            this.postoService.get(registro.substituto).subscribe({
              next: (data) => {
                this.registroForm.get('substituto')?.setValue(data);
              },
              error: (erro) => {
                console.error(erro);
                this.toastService.showDanger(erro);
              },
            });
          }
        },
      });
    }
  }

  onSubmit() {
    if (this.registroForm.valid) {
      let registro: Registro;
      registro = this.getRegistro();
      if (this.registroForm.get('id')?.value != null) {
        this.registroService
          .salvar(registro, this.registroForm.get('id')?.value)
          .subscribe({
            next: (data) => {},
            error: (erro) => {
              console.error(erro);
              this.toastService.showDanger(erro);
            },
            complete: () => {
              this.toastService.showSuccess('Registro alterado com sucesso.');
              this.atualizar.emit();
              this.registroActiveModal.dismiss();
            },
          });
      } else {
        this.registroService.criar([registro]).subscribe({
          next: (data) => {},
          error: (erro) => {
            console.error(erro);
            this.toastService.showDanger(erro);
          },
          complete: () => {
            this.toastService.showSuccess('Registro salvo com sucesso.');
            this.atualizar.emit();
            this.registroActiveModal.dismiss();
          },
        });
      }
    } else {
      this.toastService.showDanger('Preencha todos os campos obrigatórios.');
    }
  }

  private getRegistro() {
    let formulario = this.registroForm.value;
    let registro = '{';
    Object.keys(formulario).forEach((key) => {
      if (formulario[key] != null && formulario[key] != '') {
        if (key == 'posto') {
          registro += '"posto":"' + formulario[key]['id'] + '",';
        } else if (key == 'substituto') {
          registro += '"substituto":"' + formulario[key]['id'] + '",';
        } else if (key == 'data') {
          registro +=
            '"data":"' + DatasService.inputToBr(formulario[key]) + '",';
        } else {
          registro += '"' + key + '":"' + formulario[key] + '",';
        }
      }
    });
    registro = registro.slice(0, -1);
    registro += '}';
    return JSON.parse(registro);
  }

  vigilante: OperatorFunction<string, readonly Posto[]> = (
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
  formatter(posto: Posto) {
    return posto.vigilanteNome;
  }
}

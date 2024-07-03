import { Component, OnInit, inject } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../util/table/table.component';
import { StatusComponent } from '../../util/status/status.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../util/toast/toast.service';
import { DialogoGrupoComponent } from './dialogo-grupo/dialogo-grupo.component';
import { Registro } from '../models/registro';
import { Posto } from '../models/posto';
import { DatasService } from '../../util/datas.service';
import { RegistroDialogoComponent } from './registro-dialogo/registro-dialogo.component';
import { DialogoComponent } from '../../shared/dialogo/dialogo.component';

@Component({
  selector: 'app-efetividade-geral',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    StatusComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './efetividade.component.html',
  styleUrl: './efetividade.component.scss',
})
export class EfetividadeComponent implements OnInit {
  private modalService = inject(NgbModal);

  lista!: Registro[];
  valueDia: string = '';

  constructor(
    private registroService: RegistroService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.valueDia = DatasService.dateToInput(new Date());
    this.buscar();
  }

  openModal(reg: Registro) {
    const modal = this.modalService.open(RegistroDialogoComponent);
    modal.componentInstance.registroId = reg.id;
    modal.componentInstance.atualizar.subscribe(($e: any) => {
      this.buscar();
    });
  }
  registro() {
    const modal = this.modalService.open(RegistroDialogoComponent);
    modal.componentInstance.valueDia = DatasService.dateToInput(new Date());
  }

  buscar() {
    if (this.valueDia != '') {
      if (new Date(this.valueDia) instanceof Date) {
        let data = this.valueDia.split('-');
        this.registroService.getByDia(+data[2], +data[1], +data[0]).subscribe({
          next: (data) => {
            this.lista = data;
          },
        });
      } else {
        console.log('não é data;');
      }
    }
  }
  open() {
    if (this.valueDia != '' && this.lista != undefined) {
      const modal = this.modalService.open(DialogoGrupoComponent);
      let registrosLista: Registro[] = [];
      modal.componentInstance.criar.subscribe(($e: Posto[]) => {
        $e.forEach((posto) => {
          let reg: Registro = {
            data: DatasService.inputToBr(this.valueDia),
            posto: posto.id,
            status: 'A',
          };
          registrosLista.push(reg);
        });
        this.registroService.criar(registrosLista).subscribe({
          next: (data) => {},
          error: (erro) => {
            console.error(erro);
            this.toastService.showDanger(erro);
          },
          complete: () => {
            this.buscar();
          },
        });
      });
    } else {
      this.toastService.showDanger(
        'Informe a data para cadastro antes de relacionar os grupos.'
      );
    }
  }
  deletar($event: any) {
    const modal = this.modalService.open(DialogoComponent);
    modal.componentInstance.titulo = 'Excluir';
    modal.componentInstance.texto =
      '<p>Tem certeza da exclusão do registro </p><p><b>' +
      $event.data +
      ' ' +
      $event.vigilante + ' ' +
      $event.status +
      '</b>?</p>';
    modal.componentInstance.ok.subscribe((value: boolean) => {
      console.log('ok');
    });
  }
}

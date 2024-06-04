import { Component, OnInit, inject } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../util/table/table.component';
import { StatusComponent } from '../../util/status/status.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PostoService } from '../services/posto.service';
import { ToastService } from '../../util/toast/toast.service';
import { DialogoGrupoComponent } from './dialogo-grupo/dialogo-grupo.component';
import { Registro } from '../models/registro';
import { Posto } from '../models/posto';
import { DatasService } from '../../util/datas.service';
import { DialogoRegistroComponent } from './dialogo-registro/dialogo-registro.component';

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
  templateUrl: './efetividade-geral.component.html',
  styleUrl: './efetividade-geral.component.scss',
})
export class EfetividadeGeralComponent implements OnInit {
  openModal(reg: Registro) {
    const modal = this.modalService.open(DialogoRegistroComponent);
    modal.componentInstance.idRegistro = reg.id;
  }
  registro() {
    const modal = this.modalService.open(DialogoRegistroComponent);
    modal.componentInstance.valueDia = DatasService.dateToInput(new Date());
  }
  private modalService = inject(NgbModal);

  lista!: Registro[];
  valueDia: string = '';

  constructor(
    private registroService: RegistroService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.valueDia = DatasService.dateToInput(new Date());
    this.buscar()
  }

  buscar() {
    if (this.valueDia != '') {
      let data = this.valueDia.split('-');
      this.registroService.getByDia(+data[2], +data[1], +data[0]).subscribe({
        next: (data) => {
          console.log(data);
          this.lista = data;
        },
      });
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
}

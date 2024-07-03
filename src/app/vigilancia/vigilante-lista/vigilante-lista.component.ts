import { Component } from '@angular/core';
import { TableComponent } from '../../util/table/table.component';
import { VigilanteService } from '../services/vigilante.service';
import { Vigilante } from '../models/vigilante';
import { Router } from '@angular/router';
import { DialogoComponent } from '../../shared/dialogo/dialogo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vigilante-lista',
  standalone: true,
  templateUrl: './vigilante-lista.component.html',
  styleUrl: './vigilante-lista.component.scss',
  imports: [TableComponent],
})
export class VigilanteListaComponent {
  lista: any;

  constructor(
    private vigilanteService: VigilanteService,
    private router: Router,
    private modalService: NgbModal
  ) {
    vigilanteService.getAll().subscribe((data) => {
      this.lista = data;
    });
  }
  editVigilante($event: Vigilante) {
    this.router.navigate(['vigilancia/vigilante/' + $event.id]);
  }
  delVigilante($event: any) {
    const modal = this.modalService.open(DialogoComponent);
    modal.componentInstance.titulo = 'Excluir';
    modal.componentInstance.texto =
      '<p>Tem certeza da exclusão do vigilante <b>' +
      $event.nome +
      '</b>?</p>';
    modal.componentInstance.ok.subscribe((value: boolean) => {
      console.log($event.nome);
    });
  }
}

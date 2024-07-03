import { Component } from '@angular/core';
import { TableComponent } from '../../../util/table/table.component';
import { PostoService } from '../../services/posto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostoDialogoComponent } from '../posto-dialogo/posto-dialogo.component';
import { Posto } from '../../models/posto';
import { DialogoComponent } from '../../../shared/dialogo/dialogo.component';

@Component({
  selector: 'app-posto-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './posto-lista.component.html',
  styleUrl: './posto-lista.component.scss',
})
export class PostoListaComponent {
  lista: any[] = [];

  constructor(
    private postoService: PostoService,
    private modalService: NgbModal
  ) {
    postoService.getAll().subscribe({
      next: (data) => (this.lista = data),
      error: (erro) => console.log(erro),
    });
  }
  dialogo() {
    const modal = this.modalService.open(PostoDialogoComponent);
  }

  editPosto(posto: Posto) {
    const modal = this.modalService.open(PostoDialogoComponent);
    modal.componentInstance.postoId = posto.id;
  }
  delPosto($event: any) {
    const modal = this.modalService.open(DialogoComponent);
    modal.componentInstance.titulo = 'Excluir';
    modal.componentInstance.texto =
      '<p>Tem certeza da exclusão do posto <b>' +
      $event.vigilanteNome +
      ' ' +
      $event.titularidade +
      ' ' +
      $event.escala +
      '</b>?</p>';
    modal.componentInstance.ok.subscribe((value: boolean) => {
      console.log($event.vigilanteNome)
    });
  }
}

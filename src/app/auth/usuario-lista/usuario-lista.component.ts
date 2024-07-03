import { Component } from '@angular/core';
import { TableComponent } from '../../util/table/table.component';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogoComponent } from '../../shared/dialogo/dialogo.component';
import { ToastService } from '../../util/toast/toast.service';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.scss',
})
export class UsuarioListaComponent {
  lista!: any[];
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
    this.busca();
  }
  busca() {
    this.usuarioService.getAll().subscribe((data) => {
      this.lista = data;
    });
  }

  editar($event: any) {
    this.router.navigate(['/usuarios/usuario/' + $event.id]);
  }
  deletar($event: any) {
    const modal = this.modalService.open(DialogoComponent);
    modal.componentInstance.titulo = 'Excluir';
    modal.componentInstance.texto =
      '<p>Tem certeza da exclusão do usuário <b>' +
      $event.username +
      '</b>?</p>';
    modal.componentInstance.ok.subscribe((value: boolean) => {
      this.usuarioService.deletar($event).subscribe({
        next: (data) => {},
        error: (erro) => {
          if (erro.statusText == 'OK') {
            this.toastService.showSuccess('Usuário excluído com sucesso.');
            this.busca();
          }
        },
      });
    });
  }
  resetar(item: any) {
    const modal = this.modalService.open(DialogoComponent);
    modal.componentInstance.titulo = 'Resetar a senha.';
    modal.componentInstance.texto =
      '<p>Caso confirme o reset de senha para o usuário <b>' +
      item.username +
      '</b>, o usuário deve logar-se e alterar a senha o mais breve possivel.</p>';
    modal.componentInstance.ok.subscribe((value: boolean) => {
      this.usuarioService.resetSenha(item.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (erro) => {
          console.error(erro);
          if (erro.statusText == 'OK') {
            this.toastService.showSuccess('Senha resetada com sucesso.');
          }
        },
      });
    });
  }
  novo() {
    this.router.navigate(['/usuarios/usuario']);
  }
}

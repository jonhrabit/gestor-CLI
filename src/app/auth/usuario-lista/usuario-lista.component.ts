import { Component } from '@angular/core';
import { TableComponent } from '../../util/table/table.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.scss',
})
export class UsuarioListaComponent {
  lista!: any[];
  constructor(private usuarioService: UsuarioService) {
    usuarioService.getAll().subscribe((data) => {
      this.lista = data;
    });
  }
  editar($event: any) {
    throw new Error('Method not implemented.');
  }
}

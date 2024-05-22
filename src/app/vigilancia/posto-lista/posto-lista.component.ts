import { Component } from '@angular/core';
import { TableComponent } from '../../util/table/table.component';
import { PostoService } from '../services/posto.service';

@Component({
  selector: 'app-posto-lista',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './posto-lista.component.html',
  styleUrl: './posto-lista.component.scss',
})
export class PostoListaComponent {
  lista: any[]=[];

  constructor(private postoService: PostoService) {
    postoService.getAll().subscribe({
      next: (data) => (this.lista = data),
      error: (erro) => console.log(erro),
    });
  }

  editPosto($event: any) {
    throw new Error('Method not implemented.');
  }
}

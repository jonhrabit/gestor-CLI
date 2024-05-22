import { Component } from '@angular/core';
import { TableComponent } from '../../util/table/table.component';
import { VigilanteService } from '../services/vigilante.service';
import { Vigilante } from '../models/vigilante';

@Component({
  selector: 'app-vigilante-lista',
  standalone: true,
  templateUrl: './vigilante-lista.component.html',
  styleUrl: './vigilante-lista.component.scss',
  imports: [TableComponent],
})
export class VigilanteListaComponent {
  editVigilante($event: Vigilante) {
    alert($event.nome);
  }
  lista: any;
  constructor(private vigilanteService: VigilanteService) {
    vigilanteService.getAll().subscribe((data) => {
      this.lista = data;
    });
  }
}

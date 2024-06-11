import { Component } from '@angular/core';
import { TableComponent } from '../../util/table/table.component';
import { VigilanteService } from '../services/vigilante.service';
import { Vigilante } from '../models/vigilante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vigilante-lista',
  standalone: true,
  templateUrl: './vigilante-lista.component.html',
  styleUrl: './vigilante-lista.component.scss',
  imports: [TableComponent],
})
export class VigilanteListaComponent {
  constructor(private vigilanteService: VigilanteService, private router:Router) {
    vigilanteService.getAll().subscribe((data) => {
      this.lista = data;
    });
  }
  editVigilante($event: Vigilante) {
    this.router.navigate(['vigilancia/vigilante/'+$event.id]);
  }
  lista: any;
}

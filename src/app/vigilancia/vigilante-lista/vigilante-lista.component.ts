import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../material.module';
import { VigilanteService } from '../services/vigilante.service';
import { MatTableDataSource } from '@angular/material/table';
import { Vigilante } from '../models/vigilante';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vigilante-lista',
  standalone: true,
  imports: [MaterialModule, MatPaginator, MatSort],
  templateUrl: './vigilante-lista.component.html',
  styleUrl: './vigilante-lista.component.css',
})
export class VigilanteListaComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'action'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filtro = new FormGroup({
    texto: new FormControl(''),
  });

  constructor(
    private vigilanteService: VigilanteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vigilanteService.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Vigilante>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  criar() {
    this.router.navigate(['/vigilantes/0']);
  }

  doFilterchange() {
    const filvalue = this.filtro.value;
    this.dataSource.filter = filvalue.texto;
  }

  get(id: number) {
    this.router.navigate(['/vigilantes/' + id]);
  }
}

import { UsuarioService } from './../../services/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MaterialModule, MatPaginator, MatSort],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  allUsuarios: any;
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'email',
    'setor',
    'action',
  ];
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  getAll() {
    this.usuarioService.getAll().subscribe((data) => {
      this.allUsuarios = data;
      this.dataSource = new MatTableDataSource<Usuario>(this.allUsuarios);
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.getAll();
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  get(valor: string) {
    this.router.navigate(['/usuarios/' + valor]);
  }
  criar() {
    this.router.navigate(['/usuarios/0']);
  }
}

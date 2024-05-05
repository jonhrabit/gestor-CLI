import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss',
})
export class TabelaComponent implements OnInit {
  @Input() titulo!: string;
  @Input() displayedColumns!: string[];
  @Input() displayedColumnsFinal!: string[];
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() action: boolean = false;

  @Output() getItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  filtro = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.displayedColumnsFinal = [...this.displayedColumns];
    if (this.action) {
      this.displayedColumnsFinal.push('action');
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get(id: number) {
    this.getItem.emit(id);
  }
  del(id: number) {
    this.deleteItem.emit(id);
  }
  doFilterchange() {
    const valor = this.filtro.value;
    if (valor != null) this.dataSource.filter = valor;
  }

  criar() {
    throw new Error('Method not implemented.');
  }
}

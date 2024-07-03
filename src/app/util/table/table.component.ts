import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

interface Coluna {
  name: string;
  key: string;
  type: string;
  pipe: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges {
  @Input() columns: Coluna[] = [];
  @Input() data: any[] = [];
  @Input() btnreset?: boolean;
  pageSize = 10;
  currentPage = 1;
  loading = false;

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';

  searchBox: string = '';
  filteredData: any[] = [];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onReset = new EventEmitter<any>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredData = this.data;
  }

  onSearchChange(searchVal: string) {
    this.loading = true;
    this.filteredData = this.data.filter((searchData: any) => {
      let flag = false;
      this.columns.forEach((coluna) => {
        if (this.acessar(searchData, coluna.key) != null) {
          if (
            this.acessar(searchData, coluna.key)
              .toString()
              .toLowerCase()
              .indexOf(searchVal) > -1
          ) {
            flag = true;
            return;
          }
        }
      });
      if (flag) {
        return searchData;
      }
    });
    this.loading = false;
  }

  tamanho(): number {
    if (this.filteredData == undefined) {
      return 10;
    }
    return this.filteredData.length;
  }
  editRecord(item: any) {
    this.onEdit.emit(item);
  }
  deleteRecord(item: any) {
    this.onDelete.emit(item);
  }
  reset(item: any) {
    this.onReset.emit(item);
  }

  private acessar(obj: any, prop: string) {
    var tmp = obj;
    var campos = prop.split('.');

    for (var i in campos) {
      if (tmp.hasOwnProperty(campos[i])) {
        tmp = tmp[campos[i]];
      } else {
        return false;
      }
    }

    return tmp;
  }
}

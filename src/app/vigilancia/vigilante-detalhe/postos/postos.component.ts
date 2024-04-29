import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PostoService } from '../../services/posto.service';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Posto } from '../../models/posto';

@Component({
  selector: 'app-postos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './postos.component.html',
  styleUrl: './postos.component.scss',
})
export class PostosComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['escala', 'titularidade', 'inicio'];
  @Input() idVigilante!: number;

  constructor(private postoService: PostoService) {}

  ngOnInit(): void {
    this.postoService.getByVigilante(this.idVigilante).subscribe((resp) => {
      this.dataSource = new MatTableDataSource<Posto>(resp);
    });
  }
}

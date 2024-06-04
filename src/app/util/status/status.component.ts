import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent implements OnInit {
  @Input() status!: string;
  class!: string;
  classe: any;
  ngOnInit(): void {
    this.classe = 'status';
    switch (this.status) {
      case 'A':
        this.classe = this.classe + ' ativo';
        break;
      case 'FCS':
        this.classe = this.classe + ' fcs';
        break;
      case 'FNS':
        this.classe = this.classe + ' fns';
        break;
      case 'RE':
        this.classe = this.classe + ' re';
        break;

      default:
        break;
    }
  }
}

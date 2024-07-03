import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogo',
  standalone: true,
  imports: [],
  templateUrl: './dialogo.component.html',
  styleUrl: './dialogo.component.scss',
})
export class DialogoComponent {
  @Output() ok = new EventEmitter<boolean>();
  @Input() texto?: string;
  @Input() titulo?: string;

  constructor(public dialogoModal: NgbActiveModal) {}
  yes() {
    this.ok.emit(true);
    this.dialogoModal.dismiss();
  }
}

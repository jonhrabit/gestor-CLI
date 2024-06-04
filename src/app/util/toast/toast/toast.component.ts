import { Component, inject } from '@angular/core';

import { ToastService } from '../toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  host: {
    class: 'toast-container position-fixed top-0 end-0',
    style: 'z-index: 1200;margin-top:55px;margin-right:10px',
  },
})
export class Toasts {
  toastService = inject(ToastService);
}

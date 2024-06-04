import { Injectable, TemplateRef } from '@angular/core';
import { Toasts } from './toast/toast.component';

export interface Toast {
  mensagem?: string;
  classname?: string;
  delay?: number;
  template?: TemplateRef<any>;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(msg: string) {
    this.toasts.unshift({ mensagem: msg });
  }
  showAndClass(msg: string, c:string) {
    this.toasts.unshift({ mensagem: msg, classname:c });
  }
  showTemplate(msg: TemplateRef<any>) {
    this.toasts.unshift({ template: msg });
  }
  show2(msg: string) {
    this.toasts.unshift({ mensagem: msg });
  }

  showSuccess(msg: string) {
    this.toasts.unshift({ mensagem: msg, classname: 'bg-success text-light' });
  }

  showDanger(msg: string) {
    this.toasts.unshift({ mensagem: msg, classname: 'bg-danger text-light' });
  }

  showInfo(msg: string) {
    this.toasts.unshift({ mensagem: msg, classname: 'bg-warning' });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}

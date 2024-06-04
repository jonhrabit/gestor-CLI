import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpfService {
  static toDot(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }

  static removeMask(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }
}

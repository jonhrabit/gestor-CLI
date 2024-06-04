import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DatasService {
  static dateToBr(data: Date): string {
    return moment(data).format('DD/MM/YYYY');
  }
  static dateToInput(data: Date): string {
    return moment(data).format('YYYY-MM-DD');
  }

  static brToInput(data: string): string {
    let sessao = data.split('/');
    return sessao[2] + '-' + sessao[1] + '-' + sessao[0];
  }
  static inputToBr(data: string): string {
    let sessao = data.split('-');
    return sessao[2] + '/' + sessao[1] + '/' + sessao[0];
  }

  static brToDate(data: string): Date {
    return moment(data, 'DD/MM/YYYY').toDate();
  }
  static inputToDate(data: string): Date {
    return moment(data, 'yyyy-MM-DD').toDate();
  }
}

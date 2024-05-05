import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DatasService {
  constructor() {}

  static format(data: Date): string {
    return moment(data).format('DD/MM/YYYY');
  }
  static toDate(data: string): Date {
    return moment(data, 'DD/MM/YYYY').toDate();
  }
}

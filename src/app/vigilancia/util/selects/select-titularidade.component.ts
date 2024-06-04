import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-titularidade',
  standalone: true,
  imports: [],
  template: `
    <div class="form-floating">
      <select class="form-select" [id]="id" (change)="selecionar($event)">
        <option [value]=""></option>
        @for (item of valores; track $index) { @if (item==valor) {
        <option [value]="item" selected>{{ item }}</option>
        }@else {
        <option [value]="item">{{ item }}</option>
        } }
      </select>
      <label [for]="id">{{ titulo }}</label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectTitularidadeComponent,
    },
  ],
})
export class SelectTitularidadeComponent implements ControlValueAccessor {
  @Input() titulo!: string;
  @Input() id?: string;
  @Input() valor!: string;

  valores = ['TITULAR', 'SUBSTITUTO'];

  onChange = (valor: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(obj: any): void {
    this.valor = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  selecionar(v: any) {
    this.valor = v.target.value;
    this.onChange(this.valor);
    this.onTouched();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { EscalaService } from './escala.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-escala',
  standalone: true,
  imports: [],
  template: `
    <div class="form-floating">
      <select class="form-select" [id]="id" (change)="selecionar($event)">
        <option [value]=""></option>
        @for (item of valores; track $index) { @if (item["nome"]==valor) {
        <option [value]="item.nome" selected>{{ item['nome'] }}</option>
        }@else {
        <option [value]="item.nome">{{ item['nome'] }}</option>
        } }
      </select>
      <label [for]="id">{{ titulo }}</label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectEscalaComponent,
    },
  ],
})
export class SelectEscalaComponent implements OnInit, ControlValueAccessor {
  @Input() titulo!: string;
  @Input() id?: string;
  valor!: string;

  valores!: any;

  onChange = (valor: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor(private escalaService: EscalaService) {}
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
  ngOnInit(): void {
    this.valores = this.escalaService.getAll();
  }
  selecionar(v: any) {
    this.valor = v.target.value;
    this.onChange(this.valor);
    this.onTouched();
  }
}

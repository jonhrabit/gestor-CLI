import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as XLSX from 'xlsx';
import { ToastService } from '../../util/toast/toast.service';
import { Funcionario } from './model/funcionario';
import { ImportService } from '../services/import.service';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss',
})
export class ImportComponent {
  LINHA = 19;
  LIMITE_LINHA = 'Observações';

  funcionarios: Funcionario[] = [];
  uploadForm: FormGroup;
  file: File | null = null;
  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private importService: ImportService
  ) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required],
      mes: [5, Validators.required],
      ano: [2024, Validators.required],
    });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  async onProcessar() {
    let funcionarios = this.importService.readTabela(this.data);
    await this.importService.obterPostos(funcionarios);
    this.importService.funcionariosToRegistros(
      funcionarios,
      this.uploadForm.get('mes')?.value,
      this.uploadForm.get('ano')?.value
    );
  }

  onResolveVigilantes() {}
}

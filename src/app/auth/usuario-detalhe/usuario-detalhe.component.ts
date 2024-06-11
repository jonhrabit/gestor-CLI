import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../util/toast/toast.service';

@Component({
  selector: 'app-usuario-detalhe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss',
})
export class UsuarioDetalheComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: [''],
    cadastro: [''],
    nome: [''],
    username: [''],
    password: [''],
    setor: [''],
    email: [''],
    cpf: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}
}

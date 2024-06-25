import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from '../../util/toast/toast.service';
import { Usuario } from '../usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { DatasService } from '../../util/datas.service';
import { Permissao } from '../permissao';

@Component({
  selector: 'app-usuario-detalhe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss',
})
export class UsuarioDetalheComponent implements OnInit {
  listaPermissoes!: Permissao[];
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
    private route: ActivatedRoute,
    private toastService: ToastService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.listaPermissoes = this.usuarioService.getPermissoesList();
    this.popularForm();
  }

  popularForm() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      let usuario: Usuario;
      this.usuarioService.get(+id).subscribe({
        next: (data) => {
          usuario = data;
          console.log(usuario);
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
        complete: () => {
          this.form.patchValue(usuario);
          this.listaPermissoes.forEach((permissao) => {
            const valor = usuario.permissoes.indexOf(permissao.nome);
            this.form.addControl(
              permissao.nome,
              new FormControl(valor < 0 ? false : true)
            );
          });
          this.form.patchValue({
            cadastro: DatasService.dateToBr(usuario.cadastro),
          });
        },
      });
    }
  }
  send() {
    console.log(this.form.value);
  }
}

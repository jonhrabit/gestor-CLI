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

@Component({
  selector: 'app-usuario-detalhe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-detalhe.component.html',
  styleUrl: './usuario-detalhe.component.scss',
})
export class UsuarioDetalheComponent implements OnInit {
  listaPermissoes!: any;
  keysPermissoes!: string[];
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
    this.usuarioService.getPermissoes().subscribe({
      next: (data) => {
        this.listaPermissoes = data;
      },
      error: (erro) => {
        this.toastService.showDanger(erro.error);
      },
      complete: () => {
        this.keysPermissoes = Object.keys(this.listaPermissoes);
        Object.keys(this.listaPermissoes).forEach((permissao) => {
          this.form.addControl(permissao, new FormControl(false));
        });
        this.popularForm();
      },
    });
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
          this.toastService.showDanger(erro.error);
        },
        complete: () => {
          this.form.patchValue({
            cadastro: DatasService.dateToBr(usuario.cadastro),
          });
          this.form.patchValue(usuario);
          usuario.permissoes?.forEach((perm) => {
            this.form.get(perm)?.setValue(true);
          });
        },
      });
    }
  }

  send() {
    let usuario = this.form.value;
    let permissoes: string[] = [];
    this.keysPermissoes.forEach((key) => {
      if (usuario[key]) {
        permissoes.push(key);
      }
      delete usuario[key];
    });
    usuario.permissoes = permissoes;
    if (usuario.id == 0) {
      console.log('criar');
      this.usuarioService.criar(usuario).subscribe({
        next: (data) => {},
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro.error);
        },
        complete: () => {
          this.toastService.showSuccess(
            'Usuário ' + usuario.username + ' criado com sucesso.'
          );
        },
      });
    } else {
      this.usuarioService.salvar(usuario.id, usuario).subscribe({
        next: (data) => {},
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro.error);
        },
        complete: () => {
          this.toastService.showSuccess(
            'Usuário ' + usuario.username + ' salvo com sucesso.'
          );
        },
      });
    }
  }
}

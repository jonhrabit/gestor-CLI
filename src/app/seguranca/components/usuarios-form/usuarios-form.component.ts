import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.scss',
})
export class UsuariosFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioForm = this.formBuilder.group({
      id: [null],
      cadastro: [null],
      nome: [''],
      username: [''],
      setor: [''],
      email: [''],
      cpf: [''],
      permissoes: this.formBuilder.array(this.getControlPermissoes()),
    });
    if (id != null) {
      if (+id == 0) {
        this.clear();
      } else {
        this.get(+id);
      }
    }
  }
  clear() {
    this.usuarioForm.setValue({
      id: '',
      cadastro: new Date(),
      nome: '',
      username: '',
      setor: '',
      email: '',
      cpf: '',
      permissoes: this.getUsuarioPermissoes([]),
    });
  }

  update(usuario: Usuario) {
    this.usuarioForm.setValue({
      id: usuario.id,
      cadastro: usuario.cadastro,
      nome: usuario.nome,
      username: usuario.username,
      setor: usuario.setor,
      email: usuario.email,
      cpf: usuario.cpf,
      permissoes: this.getUsuarioPermissoes(usuario.permissoes),
    });
  }
  get(id: number) {
    this.usuarioService.get(id).subscribe((resposta) => {
      this.update(resposta);
    });
  }
  getPermissoesList() {
    return this.usuarioService.getPermissoesList();
  }

  getUsuarioPermissoes(permissoes: string[] = []) {
    let permissoesLIST: any = [];
    const lista = this.usuarioService.getPermissoesList();
    lista.forEach((perm) => {
      if (permissoes.length > 0) {
        permissoesLIST.push(
          permissoes.filter((p) => p == perm.nome).length != 0
        );
      } else {
        permissoesLIST.push(false);
      }
    });
    return permissoesLIST;
  }

  getControlPermissoes() {
    let permissoesLIST: any = [];
    const lista = this.usuarioService.getPermissoesList();
    lista.forEach((perm) => {
      permissoesLIST.push(new FormControl(false));
    });
    return permissoesLIST;
  }

  onSubmit() {
    let permissoes = [];
    let listaPermissoes = this.getPermissoesList();
    let usuario = this.usuarioForm.value;
    for (let i = 0; i < listaPermissoes.length; i++) {
      if (usuario.permissoes[i]) {
        permissoes.push(listaPermissoes[i].nome);
      }
    }
    usuario.permissoes = permissoes;
    if (usuario.id == '') {
      this.usuarioService.criar(usuario).subscribe({
        next: (data) =>
          this.openSnackBar('Usuário criado com sucesso.', 'Fechar'),
        error: (error) => {
          console.error(error);
          this.openSnackBar('Erro ao tentar salvar o novo usuário.', 'Fechar');
        },
      });
    } else {
      this.usuarioService.salvar(usuario, usuario.id).subscribe({
        next: (data) => {
          console.log(data);
          this.openSnackBar('Alterações salvas com sucesso.', 'Fechar');
        },
        error: (error) => {
          console.error(error);
          this.openSnackBar('Erro ao tentar salvar as alterações.', 'Fechar');
        },
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

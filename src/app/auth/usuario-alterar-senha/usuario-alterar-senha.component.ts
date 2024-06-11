import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ToastService } from '../../util/toast/toast.service';
import { Usuario } from '../usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-alterar-senha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuario-alterar-senha.component.html',
  styleUrl: './usuario-alterar-senha.component.scss',
})
export class UsuarioAlterarSenhaComponent implements OnInit {
  usuario!: Usuario;
  form = new FormBuilder().group({
    senha: [''],
    novasenha: [''],
    repetirsenha: [''],
  });

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let usuarioId = sessionStorage.getItem('usrd');
    if (usuarioId) {
      this.usuarioService.get(+usuarioId).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (erro) => {
          console.error(erro);
          this.toastService.showDanger(erro);
        },
      });
    }
  }
  send() {
    let valores = this.form.value;
    if (valores.novasenha != valores.repetirsenha) {
      this.toastService.showDanger(
        'Senha nova e repetir senha são diferentes.'
      );
    } else {
      this.usuarioService
        .alterarsenha({
          id: this.usuario.id,
          senhaAtual: valores.senha,
          novaSenha: valores.novasenha,
        })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (erro) => {
            switch (erro.status) {
              case 200:
                this.toastService.showSuccess('Senha alterada com sucesso.');
                break;
              default:
                this.toastService.showDanger(erro.error);
                break;
            }
            this.form.reset();
          },
          complete: () => {},
        });
    }
  }
}

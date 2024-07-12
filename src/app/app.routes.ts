import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { authGuard } from './auth/auth.guard';
import { UsuarioAlterarSenhaComponent } from './auth/usuario-alterar-senha/usuario-alterar-senha.component';
import { UsuarioListaComponent } from './auth/usuario-lista/usuario-lista.component';
import { UsuarioDetalheComponent } from './auth/usuario-detalhe/usuario-detalhe.component';
import { VigilanteListaComponent } from './vigilancia/vigilante-lista/vigilante-lista.component';
import { PostoListaComponent } from './vigilancia/posto/posto-lista/posto-lista.component';
import { VigilanteDetalheComponent } from './vigilancia/vigilante-detalhe/vigilante-detalhe.component';
import { EfetividadeComponent } from './vigilancia/efetividade/efetividade.component';
import { PessoasComponent } from './claviculario/pessoas/pessoas.component';
import { EmprestimosComponent } from './claviculario/emprestimos/emprestimos.component';
import { ChavesComponent } from './claviculario/chaves/chaves.component';
import { PlanilhaComponent } from './vigilancia/planilha/planilha.component';
import { ImportComponent } from './vigilancia/import/import.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:msg', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'alterarsenha',
    component: UsuarioAlterarSenhaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', component: UsuarioListaComponent },
      { path: 'usuario', component: UsuarioDetalheComponent },
      { path: 'usuario/:id', component: UsuarioDetalheComponent },
    ],
  },
  {
    path: 'claviculario',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', component: EmprestimosComponent },
      { path: 'pessoas', component: PessoasComponent },
      { path: 'chaves', component: ChavesComponent },
    ],
  },
  {
    path: 'vigilancia',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'vigilantes', component: VigilanteListaComponent },
      { path: 'vigilante', component: VigilanteDetalheComponent },
      { path: 'vigilante/:id', component: VigilanteDetalheComponent },
      { path: 'postos', component: PostoListaComponent },
      { path: 'efetividade', component: EfetividadeComponent },
      { path: 'planilha', component: PlanilhaComponent },
      { path: 'planilha/import', component: ImportComponent },
    ],
  },
];

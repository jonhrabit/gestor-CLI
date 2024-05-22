import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { authGuard } from './auth/auth.guard';
import { UsuarioAlterarSenhaComponent } from './auth/usuario-alterar-senha/usuario-alterar-senha.component';
import { UsuarioListaComponent } from './auth/usuario-lista/usuario-lista.component';
import { UsuarioDetalheComponent } from './auth/usuario-detalhe/usuario-detalhe.component';
import { VigilanteListaComponent } from './vigilancia/vigilante-lista/vigilante-lista.component';
import { PostoListaComponent } from './vigilancia/posto-lista/posto-lista.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'login/:msg', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'alterarsenha',
    component: UsuarioAlterarSenhaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    component: UsuarioListaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios/:id',
    component: UsuarioDetalheComponent,
    canActivate: [authGuard],
  },
  {
    path: 'vigilantes',
    component: VigilanteListaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'postos',
    component: PostoListaComponent,
    canActivate: [authGuard],
  },
];

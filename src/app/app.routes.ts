import { Routes } from '@angular/router';
import { VigilanteListaComponent } from './vigilancia/vigilante-lista/vigilante-lista.component';
import { PostoComponent } from './vigilancia/posto/posto.component';
import { authGuard } from './seguranca/auth.guard';
import { AltararsenhaComponent } from './seguranca/components/altararsenha/altararsenha.component';
import { UsuariosComponent } from './seguranca/components/usuarios/usuarios.component';
import { HomeComponent } from './comuns/home/home.component';
import { LoginComponent } from './seguranca/components/login/login.component';
import { UsuariosFormComponent } from './seguranca/components/usuarios-form/usuarios-form.component';
import { VigilanteDetalheComponent } from './vigilancia/vigilante-detalhe/vigilante-detalhe.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'login/:msg', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'vigilantes',
    component: VigilanteListaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'vigilantes/:id',
    component: VigilanteDetalheComponent,
    canActivate: [authGuard],
  },
  { path: 'postos', component: PostoComponent, canActivate: [authGuard] },
  {
    path: 'alterarsenha',
    component: AltararsenhaComponent,
    canActivate: [authGuard],
  },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  {
    path: 'usuarios/:id',
    component: UsuariosFormComponent,
    canActivate: [authGuard],
  },
];

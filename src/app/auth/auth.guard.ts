import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.isAutenticado()) {
    let router = inject(Router);
    if (router.url != '/login/logout') {
      router.navigate(['/login']);
    }
  }

  switch (state.url) {
    case '':
      return true;
    case '/vigilantes':
      return inject(AuthService).isAutorizado('VIGILANCIA');
    case '/usuarios':
      return inject(AuthService).isAutorizado('ADMIN');
    case '/alterarsenha':
      return inject(AuthService).isAutenticado();
    default:
      return true;
  }
};

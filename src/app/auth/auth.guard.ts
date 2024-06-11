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
      return authService.isAutorizado('VIGILANCIA');
    case '/usuarios':
      return authService.isAutorizado('ADMIN');
    /* case '/alterarsenha':
      return authService.isAutenticado(); */
    default:
      return true;
  }
};

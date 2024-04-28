import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  if (!sessionStorage.getItem("JSESSIONID")) {
    inject(Router).navigate(["/login"]);
  }

  switch (state.url) {
    case "":
      return true;
    case "/vigilantes":
      return inject(AuthService).isAutorizado("VIGILANCIA");
    case "/usuarios":
      return inject(AuthService).isAutorizado("ADMIN");
    case "/alterarsenha":
      return inject(AuthService).isAutenticado();
    default:
      return true;
  }
};

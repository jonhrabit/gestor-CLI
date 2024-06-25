import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.setToken('');
  }

  setToken(valor: string) {
    let token = valor;
    if (valor != '') {
      let payload: any = JSON.parse(atob(token.split('.')[1]));
      sessionStorage.setItem('JSESSIONID', payload.sub);
      sessionStorage.setItem('usrd', payload.usrd);
      sessionStorage.setItem('acessToken', token);
    }
  }
  getToken() {
    return sessionStorage.getItem('acessToken');
  }
  getPayload() {
    let token = sessionStorage.getItem('acessToken');
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
  }

  isAutenticado() {
    if (!sessionStorage.getItem('JSESSIONID')) {
      return true;
    }
    return false;
  }

  isAutorizado(permissao: string): boolean {
    let token = this.getToken();
    if (token != null) {
      let payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.scope.indexOf(permissao) != -1) {
        return true;
      }
    }
    return false;
  }
  logout() {
    sessionStorage.clear();
  }

  getHeaders() {
    return {
      authorization: 'Bearer ' + this.getToken(),
      /*       accept: "text/html,application/xhtml+xml,application",
      content: "application/json" */
    };
  }
}

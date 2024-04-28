import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../seguranca/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AltararsenhaComponent } from '../../seguranca/components/altararsenha/altararsenha.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {

  usuarioNome!: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.authService.getUsuarioNome.subscribe(
      (userName) => (this.usuarioNome = userName)
    );
  }
  ngOnInit(): void {}
  isAutenticado = () => {
    return true;
    //return this.usuarioNome != '';
  };

  doLogout() {
    this.usuarioNome = '';
    this.authService.logout();
    this.router.navigate(['/login', 'logout']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AltararsenhaComponent);
  }
}

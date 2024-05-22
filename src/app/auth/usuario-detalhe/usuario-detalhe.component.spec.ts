import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetalheComponent } from './usuario-detalhe.component';

describe('UsuarioDetalheComponent', () => {
  let component: UsuarioDetalheComponent;
  let fixture: ComponentFixture<UsuarioDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRol } from './usuario-rol';

describe('UsuarioRol', () => {
  let component: UsuarioRol;
  let fixture: ComponentFixture<UsuarioRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioRol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioRol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

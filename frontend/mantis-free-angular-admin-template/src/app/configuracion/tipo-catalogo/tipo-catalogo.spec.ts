import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCatalogo } from './tipo-catalogo';

describe('TipoCatalogo', () => {
  let component: TipoCatalogo;
  let fixture: ComponentFixture<TipoCatalogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoCatalogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCatalogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

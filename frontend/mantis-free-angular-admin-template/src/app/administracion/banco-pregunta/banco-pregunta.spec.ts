import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoPregunta } from './banco-pregunta';

describe('BancoPregunta', () => {
  let component: BancoPregunta;
  let fixture: ComponentFixture<BancoPregunta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoPregunta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoPregunta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

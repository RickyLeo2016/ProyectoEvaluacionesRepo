import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMatrixQuestion } from './q-matrix-question';

describe('QMatrixQuestion', () => {
  let component: QMatrixQuestion;
  let fixture: ComponentFixture<QMatrixQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QMatrixQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QMatrixQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QTrueFalse } from './q-true-false';

describe('QTrueFalse', () => {
  let component: QTrueFalse;
  let fixture: ComponentFixture<QTrueFalse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QTrueFalse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QTrueFalse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

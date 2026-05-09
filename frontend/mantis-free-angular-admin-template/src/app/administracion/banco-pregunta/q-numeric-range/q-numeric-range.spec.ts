import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QNumericRange } from './q-numeric-range';

describe('QNumericRange', () => {
  let component: QNumericRange;
  let fixture: ComponentFixture<QNumericRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QNumericRange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QNumericRange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

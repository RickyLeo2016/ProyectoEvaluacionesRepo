import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QNumeric } from './q-numeric';

describe('QNumeric', () => {
  let component: QNumeric;
  let fixture: ComponentFixture<QNumeric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QNumeric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QNumeric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMultipleChoice } from './q-multiple-choice';

describe('QMultipleChoice', () => {
  let component: QMultipleChoice;
  let fixture: ComponentFixture<QMultipleChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QMultipleChoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QMultipleChoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

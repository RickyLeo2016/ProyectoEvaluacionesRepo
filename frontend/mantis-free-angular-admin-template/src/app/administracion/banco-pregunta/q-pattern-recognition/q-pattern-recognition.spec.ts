import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QPatternRecognition } from './q-pattern-recognition';

describe('QPatternRecognition', () => {
  let component: QPatternRecognition;
  let fixture: ComponentFixture<QPatternRecognition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QPatternRecognition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QPatternRecognition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

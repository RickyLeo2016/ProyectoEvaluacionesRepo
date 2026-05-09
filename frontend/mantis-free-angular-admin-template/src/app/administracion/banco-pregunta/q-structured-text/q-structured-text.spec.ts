import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QStructuredText } from './q-structured-text';

describe('QStructuredText', () => {
  let component: QStructuredText;
  let fixture: ComponentFixture<QStructuredText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QStructuredText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QStructuredText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

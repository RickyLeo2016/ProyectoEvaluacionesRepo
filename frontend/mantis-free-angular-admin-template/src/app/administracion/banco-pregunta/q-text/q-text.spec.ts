import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QText } from './q-text';

describe('QText', () => {
  let component: QText;
  let fixture: ComponentFixture<QText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

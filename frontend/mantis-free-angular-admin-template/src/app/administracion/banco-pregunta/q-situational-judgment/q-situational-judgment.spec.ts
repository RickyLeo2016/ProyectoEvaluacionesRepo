import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSituationalJudgment } from './q-situational-judgment';

describe('QSituationalJudgment', () => {
  let component: QSituationalJudgment;
  let fixture: ComponentFixture<QSituationalJudgment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QSituationalJudgment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QSituationalJudgment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

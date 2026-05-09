import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCodeFix } from './q-code-fix';

describe('QCodeFix', () => {
  let component: QCodeFix;
  let fixture: ComponentFixture<QCodeFix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCodeFix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCodeFix);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

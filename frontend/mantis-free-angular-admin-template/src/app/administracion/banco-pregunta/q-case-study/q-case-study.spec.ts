import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCaseStudy } from './q-case-study';

describe('QCaseStudy', () => {
  let component: QCaseStudy;
  let fixture: ComponentFixture<QCaseStudy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCaseStudy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCaseStudy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

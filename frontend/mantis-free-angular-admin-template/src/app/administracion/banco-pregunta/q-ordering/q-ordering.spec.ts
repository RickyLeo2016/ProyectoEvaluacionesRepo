import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QOrdering } from './q-ordering';

describe('QOrdering', () => {
  let component: QOrdering;
  let fixture: ComponentFixture<QOrdering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QOrdering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QOrdering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

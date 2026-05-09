import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QDragOrder } from './q-drag-order';

describe('QDragOrder', () => {
  let component: QDragOrder;
  let fixture: ComponentFixture<QDragOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QDragOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QDragOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

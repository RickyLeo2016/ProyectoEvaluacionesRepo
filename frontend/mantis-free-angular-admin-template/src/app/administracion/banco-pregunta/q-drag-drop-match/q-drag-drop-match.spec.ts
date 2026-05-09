import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QDragDropMatch } from './q-drag-drop-match';

describe('QDragDropMatch', () => {
  let component: QDragDropMatch;
  let fixture: ComponentFixture<QDragDropMatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QDragDropMatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QDragDropMatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

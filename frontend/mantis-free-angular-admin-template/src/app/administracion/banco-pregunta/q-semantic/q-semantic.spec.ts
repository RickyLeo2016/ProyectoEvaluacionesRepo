import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSemantic } from './q-semantic';

describe('QSemantic', () => {
  let component: QSemantic;
  let fixture: ComponentFixture<QSemantic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QSemantic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QSemantic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

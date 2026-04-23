import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCode } from './q-code';

describe('QCode', () => {
  let component: QCode;
  let fixture: ComponentFixture<QCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

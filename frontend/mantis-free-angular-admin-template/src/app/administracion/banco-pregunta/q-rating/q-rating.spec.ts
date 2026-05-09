import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRating } from './q-rating';

describe('QRating', () => {
  let component: QRating;
  let fixture: ComponentFixture<QRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

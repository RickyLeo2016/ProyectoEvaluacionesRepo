import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMatching } from './q-matching';

describe('QMatching', () => {
  let component: QMatching;
  let fixture: ComponentFixture<QMatching>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QMatching]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QMatching);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

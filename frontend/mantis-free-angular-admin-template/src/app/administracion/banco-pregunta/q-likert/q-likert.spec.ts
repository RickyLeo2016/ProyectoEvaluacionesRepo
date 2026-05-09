import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLikert } from './q-likert';

describe('QLikert', () => {
  let component: QLikert;
  let fixture: ComponentFixture<QLikert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLikert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLikert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

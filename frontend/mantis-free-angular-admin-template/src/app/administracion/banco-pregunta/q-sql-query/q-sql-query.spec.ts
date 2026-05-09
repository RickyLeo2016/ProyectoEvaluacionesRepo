import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSqlQuery } from './q-sql-query';

describe('QSqlQuery', () => {
  let component: QSqlQuery;
  let fixture: ComponentFixture<QSqlQuery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QSqlQuery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QSqlQuery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

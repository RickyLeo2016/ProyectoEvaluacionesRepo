import { TestBed } from '@angular/core/testing';

import { BancoPregunta } from './banco-pregunta';

describe('BancoPregunta', () => {
  let service: BancoPregunta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoPregunta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

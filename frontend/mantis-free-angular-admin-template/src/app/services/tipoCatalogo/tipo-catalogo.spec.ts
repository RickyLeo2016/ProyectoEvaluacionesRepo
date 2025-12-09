import { TestBed } from '@angular/core/testing';

import { TipoCatalogo } from './tipo-catalogo';

describe('TipoCatalogo', () => {
  let service: TipoCatalogo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCatalogo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

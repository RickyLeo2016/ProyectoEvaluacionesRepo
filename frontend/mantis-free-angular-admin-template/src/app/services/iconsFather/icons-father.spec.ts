import { TestBed } from '@angular/core/testing';

import { IconsFather } from './icons-father';

describe('IconsFather', () => {
  let service: IconsFather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsFather);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

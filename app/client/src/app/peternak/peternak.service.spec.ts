import { TestBed } from '@angular/core/testing';

import { peternakService } from './peternak.service';

describe('peternakService', () => {
  let service: peternakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(peternakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

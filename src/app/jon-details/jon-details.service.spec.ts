import { TestBed } from '@angular/core/testing';

import { JonDetailsService } from './jon-details.service';

describe('JonDetailsService', () => {
  let service: JonDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JonDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

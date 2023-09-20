import { TestBed } from '@angular/core/testing';

import { PopviewService } from './popview.service';

describe('PopviewService', () => {
  let service: PopviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

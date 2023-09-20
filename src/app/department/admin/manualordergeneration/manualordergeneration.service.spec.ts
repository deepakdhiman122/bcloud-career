import { TestBed } from '@angular/core/testing';

import { ManualordergenerationService } from './manualordergeneration.service';

describe('ManualordergenerationService', () => {
  let service: ManualordergenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualordergenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

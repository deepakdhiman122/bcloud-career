import { TestBed } from '@angular/core/testing';

import { AddnewamcService } from './addnewamc.service';

describe('AddnewamcService', () => {
  let service: AddnewamcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewamcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

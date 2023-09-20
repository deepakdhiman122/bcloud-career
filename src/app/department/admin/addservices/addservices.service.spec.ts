import { TestBed } from '@angular/core/testing';

import { AddservicesService } from './addservices.service';

describe('AddservicesService', () => {
  let service: AddservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

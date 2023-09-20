import { TestBed } from '@angular/core/testing';

import { ViewserviceordersService } from './viewserviceorders.service';

describe('ViewserviceordersService', () => {
  let service: ViewserviceordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewserviceordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

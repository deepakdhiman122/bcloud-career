import { TestBed } from '@angular/core/testing';

import { ViewamcordersService } from './viewamcorders.service';

describe('ViewamcordersService', () => {
  let service: ViewamcordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewamcordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

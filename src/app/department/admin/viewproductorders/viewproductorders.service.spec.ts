import { TestBed } from '@angular/core/testing';

import { ViewproductordersService } from './viewproductorders.service';

describe('ViewproductordersService', () => {
  let service: ViewproductordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewproductordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

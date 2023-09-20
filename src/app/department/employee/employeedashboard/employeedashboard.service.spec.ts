import { TestBed } from '@angular/core/testing';

import { EmployeedashboardService } from './employeedashboard.service';

describe('EmployeedashboardService', () => {
  let service: EmployeedashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeedashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DatewiseexcelreportService } from './datewiseexcelreport.service';

describe('DatewiseexcelreportService', () => {
  let service: DatewiseexcelreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatewiseexcelreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

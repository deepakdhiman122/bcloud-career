import { TestBed } from '@angular/core/testing';

import { OrderwisefeedbackService } from './orderwisefeedback.service';

describe('OrderwisefeedbackService', () => {
  let service: OrderwisefeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderwisefeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

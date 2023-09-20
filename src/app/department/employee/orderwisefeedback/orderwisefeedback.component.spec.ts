import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderwisefeedbackComponent } from './orderwisefeedback.component';

describe('OrderwisefeedbackComponent', () => {
  let component: OrderwisefeedbackComponent;
  let fixture: ComponentFixture<OrderwisefeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderwisefeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderwisefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseexcelreportComponent } from './datewiseexcelreport.component';

describe('DatewiseexcelreportComponent', () => {
  let component: DatewiseexcelreportComponent;
  let fixture: ComponentFixture<DatewiseexcelreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatewiseexcelreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatewiseexcelreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

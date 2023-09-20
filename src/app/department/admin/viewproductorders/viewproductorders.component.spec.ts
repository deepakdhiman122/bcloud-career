import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductordersComponent } from './viewproductorders.component';

describe('ViewproductordersComponent', () => {
  let component: ViewproductordersComponent;
  let fixture: ComponentFixture<ViewproductordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewproductordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewproductordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

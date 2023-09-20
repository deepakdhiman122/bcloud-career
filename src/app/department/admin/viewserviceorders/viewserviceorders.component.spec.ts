import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewserviceordersComponent } from './viewserviceorders.component';

describe('ViewserviceordersComponent', () => {
  let component: ViewserviceordersComponent;
  let fixture: ComponentFixture<ViewserviceordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewserviceordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewserviceordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

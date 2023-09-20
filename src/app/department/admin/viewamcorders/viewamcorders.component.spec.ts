import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewamcordersComponent } from './viewamcorders.component';

describe('ViewamcordersComponent', () => {
  let component: ViewamcordersComponent;
  let fixture: ComponentFixture<ViewamcordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewamcordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewamcordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

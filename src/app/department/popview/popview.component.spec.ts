import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopviewComponent } from './popview.component';

describe('PopviewComponent', () => {
  let component: PopviewComponent;
  let fixture: ComponentFixture<PopviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

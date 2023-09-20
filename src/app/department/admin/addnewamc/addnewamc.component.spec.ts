import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewamcComponent } from './addnewamc.component';

describe('AddnewamcComponent', () => {
  let component: AddnewamcComponent;
  let fixture: ComponentFixture<AddnewamcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewamcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewamcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

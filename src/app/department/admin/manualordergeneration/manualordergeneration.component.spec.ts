import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualordergenerationComponent } from './manualordergeneration.component';

describe('ManualordergenerationComponent', () => {
  let component: ManualordergenerationComponent;
  let fixture: ComponentFixture<ManualordergenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualordergenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualordergenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

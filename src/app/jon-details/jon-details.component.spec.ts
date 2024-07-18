import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JonDetailsComponent } from './jon-details.component';

describe('JonDetailsComponent', () => {
  let component: JonDetailsComponent;
  let fixture: ComponentFixture<JonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JonDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

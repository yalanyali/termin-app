import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteAppointmentComponent } from './form-delete-appointment.component';

describe('FormDeleteAppointmentComponent', () => {
  let component: FormDeleteAppointmentComponent;
  let fixture: ComponentFixture<FormDeleteAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeleteAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeleteAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

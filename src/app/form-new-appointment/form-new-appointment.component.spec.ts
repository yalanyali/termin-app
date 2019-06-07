import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewAppointmentComponent } from './form-new-appointment.component';

describe('FormNewAppointmentComponent', () => {
  let component: FormNewAppointmentComponent;
  let fixture: ComponentFixture<FormNewAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

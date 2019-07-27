import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAppointmentAddNoteComponent } from './form-appointment-add-note.component';

describe('FormAppointmentAddNoteComponent', () => {
  let component: FormAppointmentAddNoteComponent;
  let fixture: ComponentFixture<FormAppointmentAddNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAppointmentAddNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAppointmentAddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

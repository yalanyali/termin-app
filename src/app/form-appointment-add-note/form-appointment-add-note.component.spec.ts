import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAppointmentNewNoteComponent } from './form-appointment-new-note.component';

describe('FormAppointmentNewNoteComponent', () => {
  let component: FormAppointmentNewNoteComponent;
  let fixture: ComponentFixture<FormAppointmentNewNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAppointmentNewNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAppointmentNewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

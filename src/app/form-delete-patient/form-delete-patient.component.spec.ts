import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeletePatientComponent } from './form-delete-patient.component';

describe('FormDeletePatientComponent', () => {
  let component: FormDeletePatientComponent;
  let fixture: ComponentFixture<FormDeletePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeletePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

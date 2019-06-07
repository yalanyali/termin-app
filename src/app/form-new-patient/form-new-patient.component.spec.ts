import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewPatientComponent } from './form-new-patient.component';

describe('FormNewPatientComponent', () => {
  let component: FormNewPatientComponent;
  let fixture: ComponentFixture<FormNewPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

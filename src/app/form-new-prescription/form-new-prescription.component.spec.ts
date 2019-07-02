import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewPrescriptionComponent } from './form-new-prescription.component';

describe('FormNewPrescriptionComponent', () => {
  let component: FormNewPrescriptionComponent;
  let fixture: ComponentFixture<FormNewPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

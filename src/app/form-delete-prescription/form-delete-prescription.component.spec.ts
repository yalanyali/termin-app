import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeletePrescriptionComponent } from './form-delete-prescription.component';

describe('FormDeletePrescriptionComponent', () => {
  let component: FormDeletePrescriptionComponent;
  let fixture: ComponentFixture<FormDeletePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeletePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeletePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

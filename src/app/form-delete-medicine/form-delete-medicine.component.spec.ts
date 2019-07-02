import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteMedicineComponent } from './form-delete-medicine.component';

describe('FormDeleteMedicineComponent', () => {
  let component: FormDeleteMedicineComponent;
  let fixture: ComponentFixture<FormDeleteMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeleteMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeleteMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatStepper } from '@angular/material';

import { PatientService } from '../_services';

import * as _moment from 'moment';
import { Patient, Appointment, Address } from '../_models';
import { ValidateUniqueValues } from '../validators/GenericBackendValidator';

const moment = _moment;

/**
 * New `Patient` creation dialog.
 * 
 * Has a reactive form to get `Patient` info.
 * 
 * Also used when updating an `Patient`.
 */
@Component({
  selector: 'app-form-new-patient',
  templateUrl: './form-new-patient.component.html',
  styleUrls: ['./form-new-patient.component.css']
})
export class FormNewPatientComponent implements OnInit {

  @ViewChild(MatStepper) private stepper: MatStepper;
  basicInfoForm: FormGroup;
  addressForm: FormGroup;
  formError = {
    'hidden': true,
    'text': ''
  }
  patient: Patient = new Patient();
  appointment: Appointment = new Appointment();
  appointmentMade: boolean = false;
  datetime: _moment.Moment;
  updating: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormNewPatientComponent>,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    // When data has patient object, component updates current info
    this.updating = !!this.data.patient;

    // Helper function to shorten default value assignments
    const p = (attribute, subattribute = null) => {
      if (!!this.data.patient) {
        if (subattribute) {
          return this.data.patient[attribute][subattribute];
        } else {
          return this.data.patient[attribute];
        }
      } else {
        return '';
      }
    };

    this.basicInfoForm = this.formBuilder.group({
      firstName: [p('firstName'), [Validators.required, Validators.minLength(2)]],
      lastName: [p('lastName'), [Validators.required, Validators.minLength(2)]],
      gender: [p('gender'), Validators.required],
      dateOfBirth: [moment(p('dateOfBirth'), 'DD.MM.YYYY').toDate(), Validators.required],
      email: [p('email'),
      [Validators.required, Validators.minLength(5), Validators.email],
      [ValidateUniqueValues.createValidator(this.patientService, 'email', p('email'))]
      ],
      insuranceNumber: [p('insuranceNumber'),
      [Validators.required],
      [ValidateUniqueValues.createValidator(this.patientService, 'insuranceNumber', p('insuranceNumber'))]
      ]
    });
    this.addressForm = this.formBuilder.group({
      phoneNumber: [p('phoneNumber'),
      [Validators.required, Validators.pattern('^0\\d{11}$')],
      [ValidateUniqueValues.createValidator(this.patientService, 'phoneNumber', p('phoneNumber'))]
      ],
      state: [p('address', 'state'), [Validators.required]],
      city: [p('address', 'city'), [Validators.required]],
      street: [p('address', 'street'), [Validators.required]],
      buildingNumber: [p('address', 'buildingNumber'), [Validators.required]],
      zip: [p('address', 'zip'), [Validators.required]]
    });
  }

  get f1() { return this.basicInfoForm.controls; }
  get f2() { return this.addressForm.controls; }

  handleNewAppointmentClose(newAppointment: Appointment) {
    // Appointment created
    this.appointmentMade = true;
    this.appointment = newAppointment;
    this.stepper.next();
  }

  readForm() {
    console.log(this.f1, this.f2)
    // Form 1 has patient attributes
    Object.keys(this.f1).map(key => {
      if (key === 'dateOfBirth') {
        // Convert to default format
        this.patient[key] = moment(this.f1[key].value).format('DD.MM.YYYY');
      } else {
        this.patient[key] = this.f1[key].value;
      }
    });
    // Form 2 has phoneNumber of patient and all address attributes
    this.patient.address = new Address();
    Object.keys(this.f2).map(key => {
      if (key === 'phoneNumber') {
        this.patient[key] = this.f2[key].value;
      } else {
        this.patient.address[key] = this.f2[key].value;
      }
    });
  }

  createPatient() {
    if (this.patient.id) { return; }
    this.readForm()
    if (this.updating) {
      // UPDATE
      this.patientService.updatePatient(this.data.patient.id, this.patient).subscribe(res => {
        if (res.id) {
          this._snackBar.open("Patient updated!", '', {
            duration: 3000
          });
          this.patient.id = res.id;
        } else if (res.error) {
          this._snackBar.open("Problem: " + res.error, '', {
            duration: 3000
          });
        }
      })
    } else {
      // CREATE
      this.patientService.addNewPatient(this.patient).subscribe(res => {
        if (res.data.id) {
          this._snackBar.open("Patient created!", '', {
            duration: 3000
          });
          this.patient.id = res.data.id;
        } else if (res.error) {
          this._snackBar.open("Problem: " + res.error, '', {
            duration: 3000
          });
        }
      })
    }

  }

  close() {
    this.dialogRef.close();
  }

}

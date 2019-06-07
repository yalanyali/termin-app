import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatStepper } from '@angular/material';

import { PatientService } from '../_services';

import * as _moment from 'moment';
import { Patient, Appointment } from '../_models';
import { ValidateUniqueValues } from '../validators/GenericBackendValidator';

const moment = _moment;

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
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormNewPatientComponent>,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private _snackBar: MatSnackBar) {

  }


  ngOnInit() {
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.minLength(5), Validators.email],
        [ValidateUniqueValues.createValidator(this.patientService, 'email')]
      ],
      insuranceNumber: ['',
        [Validators.required],
        [ValidateUniqueValues.createValidator(this.patientService, 'insuranceNumber')]
      ]
    });
    this.addressForm = this.formBuilder.group({
      phoneNumber: ['',
        [Validators.required, Validators.pattern('^0\\d{11}$')],
        [ValidateUniqueValues.createValidator(this.patientService, 'phoneNumber')]
      ],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      buildingNumber: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    });
  }

  get f1() { return this.basicInfoForm.controls; }
  get f2() { return this.addressForm.controls; }

  handleDateChange(e) {
    this.datetime = moment(e);
    this.patient.dateOfBirth = this.datetime.format('DD.MM.YYYY');
    this.patient.diseaseIdList = "";
  }

  handleNewAppointmentClose(newAppointment: Appointment) {
    // Appointment created
    this.appointmentMade = true;
    this.appointment = newAppointment;
    this.stepper.next();
  }

  createPatient() {
    if (this.patient.id) { return; }
    Object.keys(this.f1).map(key => {
      this.patient[key] = this.f1[key].value
      // console.log(this.f1[key].value)
    })
    Object.keys(this.f2).map(key => {
      this.patient[key] = this.f2[key].value
      // console.log(this.f2[key])
    })
    this.patientService.addNewPatient(this.patient).subscribe(res => {
      if (res.id) {
        this._snackBar.open("Patient created!", '', {
          duration: 3000
        });
        this.patient.id = res.id;
        console.log("NEW PATIENT ID:", res.id);
      } else if (res.error) {
        this._snackBar.open("Problem: " + res.error, '', {
          duration: 3000
        });
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  test() {
    console.log(this.f2.phoneNumber.errors)
  }

}

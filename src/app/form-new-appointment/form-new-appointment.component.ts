import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import * as _moment from 'moment';
import { PatientService } from '../_services';
import { Appointment } from '../_models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

const moment = _moment;

@Component({
  selector: 'app-form-new-appointment',
  templateUrl: './form-new-appointment.component.html',
  styleUrls: ['./form-new-appointment.component.css']
})
export class FormNewAppointmentComponent implements OnInit {

  @Input() datePickerAutoOpen: boolean = true;
  @Input() patientId: String = "0"; // External use
  @Input() patientName: String = ""; // External use
  @Output() afterClose: EventEmitter<any> = new EventEmitter();
  appointment = new Appointment();
  form: FormGroup;
  formError = {
    'hidden': true,
    'type': '',
    'text': ''
  }
  datetime: _moment.Moment;
  timeSet: boolean = false;
  description: string;
  button = {
    'text': 'OK',
    'color': 'primary'
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormNewAppointmentComponent>,
    // private fb: FormBuilder,
    private patientService: PatientService) {
    // this.form = fb.group({
    //   appointmentDate: [moment(), Validators.required],
    //   appointmentTime: [Validators.required]
    // });
    // this.patientObservable = patientService.getAll();
   }

  ngOnInit() {
    // console.log(this.patientId);
  }

  handleTimeChange(e) {
    this.timeSet = true;
    this.datetime = moment(e);
  }

  handleDateChange(e) {
    this.datetime = moment(e);
  }

  handleOkButton() {
    this.formError.hidden = true;
    if (!this.timeSet) {
      this.formError.type = 'value';
      this.buttonFeedback({
        'color': 'warn',
        'text': 'Appointment time was not set!'
      })
      return;
    }
    this.appointment.datetime = this.datetime.format('DD.MM.YYYY hh:mm');
    this.appointment.description = this.description;
    let patientId = this.data.id || this.patientId;
    this.patientService.addAppointment(patientId, this.appointment)
      .subscribe(res => {
        if (res.success) {
          this.buttonFeedback({
            'color': 'accent',
            'text': 'Success'
          }, true)
        } else {
          this.formError.hidden = false;
          this.formError.type = 'conflict';
          this.formError.text = res.patient;
          this.buttonFeedback({
            'color': 'warn',
            'text': 'ERROR'
          })
        }
      });
  }

  buttonFeedback(tempButton, closeAfter=false) {
    this.button = tempButton
    setTimeout(() => {
      this.button = {
        'color': 'primary',
        'text': 'OK'
      }
      if (this.data.id && closeAfter) {
        this.dialogRef.close();
      } else if (this.patientId && closeAfter) {
        this.afterClose.emit(this.appointment);
      }
    }, 1500)
  }
  
}

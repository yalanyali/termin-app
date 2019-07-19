import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as _moment from 'moment';
import { PatientService, AppointmentService } from '../_services';
import { Appointment } from '../_models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

const moment = _moment;

/**
 * New `Appointment` creation dialog.
 * 
 * Also used when updating an `Appointment`.
 */
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
  updating: boolean = false;
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
    private patientService: PatientService,
    private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    // When data has appointment object, component updates current info
    this.updating = !!this.data.appointment;
  }

  handleTimeChange(e) {
    this.timeSet = true;
    this.datetime = moment(e);
  }

  handleDateChange(e) {
    this.datetime = moment(e);
  }

  isBetweenWorkingHours(date) {
    const minutesOfDay = (m) => {
      return m.minutes() + m.hours() * 60;
    }
    const first = moment('08:00', 'HH:mm');
    const second = moment('16:30', 'HH:mm');
    return (minutesOfDay(first) <= minutesOfDay(date)) && (minutesOfDay(date) <= minutesOfDay(second));
  }

  handleOkButton() {
    this.formError.hidden = true;
    if (!this.timeSet) {
      this.formError.type = 'value';
      this.buttonFeedback({
        'color': 'warn',
        'text': 'Terminzeit nicht festgelegt'
      });
      return;
    } else if (!this.description) {
      this.formError.type = 'value';
      this.buttonFeedback({
        'color': 'warn',
        'text': 'Keine Angabe für Beschwerde'
      });
      return;
    } else if ([0, 6].includes(this.datetime.toDate().getDay())) {
      // Weekend
      this.buttonFeedback({
        'color': 'warn',
        'text': 'Wochenende'
      });
      return;
    } else if (!this.isBetweenWorkingHours(this.datetime)) {
      // Outside of working hours
      this.buttonFeedback({
        'color': 'warn',
        'text': 'Außer Öffnungszeiten'
      });
      return;
    }
    this.appointment.dateTime = this.datetime.format('DD.MM.YYYY HH:mm');
    this.appointment.description = this.description;
    let patientId = this.data.id || this.patientId;
    if (this.updating) {
      this.appointmentService.updateAppointment(this.data.appointment.id, this.appointment)
        .subscribe(res => {
          if (res.message === 'success') {
            this.buttonFeedback({
              'color': 'accent',
              'text': 'Erfolgreich'
            }, true)
          } else {
            this.formError.hidden = false;
            this.formError.type = 'conflict';
            this.formError.text = res.patient;
            this.buttonFeedback({
              'color': 'warn',
              'text': 'Fehler'
            })
          }
        });
    } else {
      this.patientService.addAppointment(patientId, this.appointment)
        .subscribe(res => {
          if (res.message === 'success') {
            this.buttonFeedback({
              'color': 'accent',
              'text': 'Erfolgreich'
            }, true)
          } else {
            this.formError.hidden = false;
            this.formError.type = 'conflict';
            this.formError.text = res.patient;
            this.buttonFeedback({
              'color': 'warn',
              'text': 'Fehler'
            })
          }
        });
    }

  }

  buttonFeedback(tempButton, closeAfter = false) {
    this.button = tempButton
    setTimeout(() => {
      this.button = {
        'color': 'primary',
        'text': 'OK'
      }
      if (closeAfter) {
        this.dialogRef.close();
      } else if (this.patientId && closeAfter) {
        this.afterClose.emit(this.appointment);
      }
    }, 1500)
  }

}

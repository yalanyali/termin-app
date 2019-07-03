import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppointmentService } from '../_services';
import { AppointmentRecord } from '../_models';

/**
* A popup dialog to add note to an `Appointment`.
*/
@Component({
  selector: 'app-form-appointment-add-note',
  templateUrl: './form-appointment-add-note.component.html',
  styleUrls: ['./form-appointment-add-note.component.css']
})
export class FormAppointmentAddNoteComponent implements OnInit {

  @Output() afterClose: EventEmitter<any> = new EventEmitter();
  note: string;
  formError = {
    'hidden': true,
    'type': '',
    'text': ''
  };
  button = {
    'text': 'OK',
    'color': 'primary'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormAppointmentAddNoteComponent>,
    private appointmentService: AppointmentService) {
   }

  ngOnInit() {
    // console.log(this.patientId);
  }

  handleOkButton() {
    this.formError.hidden = true;
    let appointmentRecord = new AppointmentRecord();
    appointmentRecord.notes = this.note;
    let appointmentId = this.data.id
    this.appointmentService.addNotes(appointmentId, appointmentRecord)
      .subscribe(res => {
        if (res.success) {
          this.buttonFeedback({
            'color': 'accent',
            'text': 'Success'
          }, true)
        } else {
          // ERROR
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
      if (closeAfter) {
        this.dialogRef.close();
      }
      // else if (this.patientId && closeAfter) {
      //   this.afterClose.emit(this.appointment);
      // }
    }, 1500)
  }
  

}
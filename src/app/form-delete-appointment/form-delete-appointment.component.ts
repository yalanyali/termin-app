import { Component, Inject, Input } from '@angular/core';
import { AppointmentService } from '../_services';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

/**
* A popup dialog to confirm `Appointment` deletion.
* Calls `AppointmentService.deleteAppointment()` on confirmation.
*/
@Component({
  selector: 'app-form-delete-appointment',
  templateUrl: './form-delete-appointment.component.html',
  styleUrls: ['./form-delete-appointment.component.css']
})
export class FormDeleteAppointmentComponent {

  @Input() appointmentId: String = "0"; // External use
  @Input() appointmentName: String = ""; // External use
  formError = {
    'hidden': true,
    'text': ''
  }
  button = {
    'text': 'OK',
    'color': 'primary'
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormDeleteAppointmentComponent>,
    private appointmentService: AppointmentService,
    private _snackBar: MatSnackBar) { }

  handleOkButton() {
    this.formError.hidden = true;
    let appointmentId = this.data.id || this.appointmentId;
    this.appointmentService.deleteAppointment(appointmentId)
      .subscribe(res => {
        if (res.message === 'success') {
          this.buttonFeedback({
            'color': 'accent',
            'text': 'Success'
          }, true)
        } else {
          this.formError.hidden = false;
          this.formError.text = res.appointment;
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
      if (closeAfter)
        this.dialogRef.close();
        this._snackBar.open("Die Daten wurden gelöscht!", '', { duration: 2000 });
    }, 1500)
  }
  
}

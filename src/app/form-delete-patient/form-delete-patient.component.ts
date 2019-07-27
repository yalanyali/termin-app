import { Component, Inject, Input } from '@angular/core';

import { PatientService } from '../_services';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';


/**
* A popup dialog to confirm `Patient` deletion.
* Calls `PatientService.deletePatient()` on confirmation.
*/
@Component({
  selector: 'app-form-delete-patient',
  templateUrl: './form-delete-patient.component.html',
  styleUrls: ['./form-delete-patient.component.css']
})
export class FormDeletePatientComponent {

  @Input() patientId: String = "0"; // External use
  @Input() patientName: String = ""; // External use
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
    private dialogRef: MatDialogRef<FormDeletePatientComponent>,
    private patientService: PatientService,
    private _snackBar: MatSnackBar) { }


  handleOkButton() {
    this.formError.hidden = true;
    let patientId = this.data.id || this.patientId;
    this.patientService.deletePatient(patientId)
      .subscribe(res => {
        if (res.message === 'success') {
          this.buttonFeedback({
            'color': 'accent',
            'text': 'Success'
          }, true)
        } else {
          this.formError.hidden = false;
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
      if (closeAfter)
        this.dialogRef.close();
        this._snackBar.open("Die Daten wurden gelöscht!", '', { duration: 2000 });
    }, 1500)
  }
  
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PrescriptionService } from '../_services/prescription.service';

@Component({
  selector: 'app-form-delete-prescription',
  templateUrl: './form-delete-prescription.component.html',
  styleUrls: ['./form-delete-prescription.component.css']
})
export class FormDeletePrescriptionComponent {

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
    private dialogRef: MatDialogRef<FormDeletePrescriptionComponent>,
    private prescriptionService: PrescriptionService,
    private _snackBar: MatSnackBar) {
   }

  handleOkButton() {
    this.formError.hidden = true;
    let prescriptionId = this.data.id;
    this.prescriptionService.deletePrescription(prescriptionId)
      .subscribe(res => {
        if (res.message === 'success') {
          this.buttonFeedback({
            'color': 'accent',
            'text': 'Success'
          }, true)
        } else {
          this.formError.hidden = false;
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

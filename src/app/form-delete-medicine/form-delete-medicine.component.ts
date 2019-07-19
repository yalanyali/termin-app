import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MedicineService } from '../_services/medicine.service';

@Component({
  selector: 'app-form-delete-medicine',
  templateUrl: './form-delete-medicine.component.html',
  styleUrls: ['./form-delete-medicine.component.css']
})
export class FormDeleteMedicineComponent {

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
    private dialogRef: MatDialogRef<FormDeleteMedicineComponent>,
    private medicineService: MedicineService,
    private _snackBar: MatSnackBar) {
   }

  handleOkButton() {
    this.formError.hidden = true;
    let medicineId = this.data.id;
    this.medicineService.deleteMedicine(medicineId)
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

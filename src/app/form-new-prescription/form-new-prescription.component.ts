import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PatientService } from '../_services';
import { Observable, of } from 'rxjs';
import { startWith, map, debounceTime, switchMap, finalize, tap, catchError } from 'rxjs/operators';
import { Prescription, Medicine } from '../_models';

import * as _moment from 'moment';
import { MedicineService } from '../_services/medicine.service';
const moment = _moment;

@Component({
  selector: 'app-form-new-prescription',
  templateUrl: './form-new-prescription.component.html',
  styleUrls: ['./form-new-prescription.component.css']
})
export class FormNewPrescriptionComponent implements OnInit {
  @Input() patientName: String = ""; // External use

  prescription = new Prescription();
  medicineForm: FormGroup;
  filteredMedicine: Array<Medicine> = [];
  showAutocompletePanel = false;
  isLoading = false;
  addToDatabasePanelOpened = false;
  newMedicine = new Medicine();
  formError = {
    'hidden': true,
    'type': '',
    'text': ''
  };
  button = {
    'text': 'OK',
    'color': 'primary'
  };
  currentDate = moment().format('DD.MM.YYYY');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormNewPrescriptionComponent>,
    private patientService: PatientService,
    private medicineService: MedicineService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.medicineForm = this.fb.group({
      userInput: null
    })

    this.medicineForm
      .get('userInput')
      .valueChanges
      .pipe(
        // startWith(''),
        debounceTime(300),
        tap(() => {
          this.showAutocompletePanel = true;
          this.isLoading = true
        }),
        switchMap(value => {
          // Clicking on an autocomplete option passes
          // the object of the option as value
          // No need to go further when it's already an object from server
          if (typeof value === 'object') {
            // End pipe with empty observer
            return of({});
          }
          return this.medicineService.autocomplete(value)
            .pipe(
              finalize(() => this.isLoading = false),
            )
        }
        )
      )
      //@ts-ignore: Array<Medicine>
      .subscribe((medicineList: Array<Medicine>) => {
        this.filteredMedicine = medicineList
        if (medicineList.length === 0) {
          this.showAutocompletePanel = false;
        }
      });
  }

  displayFn(med: Medicine) {
    if (med) { return med.name; }
  }

  handleKeydown(ev) {
    ev.stopPropagation();
    if (ev.keyCode === 8) {
      this.clearInput();
    }
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, '', {
      duration: 3000
    });
  }

  clearInput() {
    this.medicineForm.reset();
  }

  private async handleAddButton() {
    let medicine: Medicine;
    // Clicked on autocomplete option
    // Medicine object came from server as Medicine type
    if (!!this.medicineForm.value.userInput.id) {
      medicine = this.medicineForm.value.userInput;
    } else {
      // Manual input, name only, will be converted to Medicine type
      // Check if Medicine name exists as an option
      if (this.filteredMedicine.find(m => m.name === this.medicineForm.value.userInput)) {
        // Medicine exists on database, no need to add
        // Getting Medicine object from database
        const medicineName = this.medicineForm.value.userInput;
        medicine = await this.medicineService.autocomplete(medicineName).toPromise();
        medicine = medicine[0]; // Get first element in array
      } else {
        // New Medicine needs to be added to database
        this.openSnackBar("Medikament nicht gefunden!");
        this.addToDatabasePanelOpened = true;
        return;
      }
    }
    // At this point, medicine is our Medicine object from database
    // Avoid duplicate entries
    if (this.prescription.medicine.includes(medicine)) { return; }
    this.prescription.medicine.push(medicine);
    this.clearInput();
  }

  private async handleNewButton() {
    this.newMedicine.name = this.medicineForm.value.userInput;
    this.medicineService.addNewMedicine(this.newMedicine)
      .subscribe(res => {
        if (res.data.id) {
          this.openSnackBar("Medikament gespeichert!");
          this.prescription.medicine.push(res.data);
          this.addToDatabasePanelOpened = false;
          this.clearInput();
        } else {
          this.openSnackBar("Fehler beim Speichern");
        }
      });
  }

  private handleDeleteButton(selectedMedicine) {
    this.prescription.medicine = this.prescription.medicine.filter(m => m !== selectedMedicine);
  }

  private handleOkButton() {
    this.patientService.addPrescription(this.data.id, this.prescription)
      .subscribe(res => {
        if (res.success) {
          this.openSnackBar("Rezept gespeichert!");
          this.dialogRef.close();
        } else {
          this.openSnackBar("Fehler beim Speichern");
        }
      });
  }

}

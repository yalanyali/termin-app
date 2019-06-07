import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { MatBottomSheet, MatDialog } from '@angular/material';

import { PatientColumns } from '../_models';
import { PatientService } from '../_services';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { FormNewAppointmentComponent } from '../form-new-appointment/form-new-appointment.component';
import { FormNewPatientComponent } from '../form-new-patient/form-new-patient.component';
import { FormDeletePatientComponent } from '../form-delete-patient/form-delete-patient.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  selectedPatient;
  patientObservable;
  listColumns = PatientColumns;

  @ViewChild(ListComponent) listRef: ListComponent;

  constructor(
    private patientService: PatientService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) {
    this.patientObservable = patientService.getAll();
  }

  ngOnInit() {

  }

  handlePatientOnClick(e) {
    this.selectedPatient = e;
    this.openBottomSheet();
  }

  openBottomSheet() {
    const sheet = this.bottomSheet.open(BottomSheetComponent, {
      hasBackdrop: true,
      data: {
        buttons: [
          {
            "id": "add_appointment",
            "icon": "alarm_add",
            "text": "Neuen Termin...",
            "description": `Einen neuen Termin vereinbaren`
          },
          {
            "id": "add_prescription",
            "icon": "receipt",
            "text": "Neues Rezept...",
            "description": `Ein neues Rezept hinzufügen`
          },
          {
            "id": "delete_patient",
            "icon": "person_add_disabled",
            "text": "Daten löschen...",
            "description": `Alle Daten von ${this.selectedPatient.firstName} ${this.selectedPatient.lastName} löschen`
          }
        ],
        title: `${this.selectedPatient.firstName} ${this.selectedPatient.lastName}`
      }
    });
    sheet.afterDismissed().subscribe((buttonId) => {
      this.handleBottomSheetButton(buttonId);
    });
  }

  handleBottomSheetButton(buttonId) {
    switch(buttonId) {
      case 'add_appointment':
        this.openNewAppointmentDialog();
        break;
      case 'delete_patient':
        this.openDeletePatientDialog();
        break;
      default:
        break;
    }
  }

  handleFabButtonOnClick() {
    this.openNewPatientDialog();
  }

  openNewAppointmentDialog() {
    const dialogRef = this.dialog.open(FormNewAppointmentComponent, {
      data: {
        id: this.selectedPatient.id,
        patientName: `${this.selectedPatient.firstName} ${this.selectedPatient.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  openNewPatientDialog() {
    const dialogRef = this.dialog.open(FormNewPatientComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // To refresh the list
      this.listRef.refreshList();
    });
  }

  openDeletePatientDialog() {
    const dialogRef = this.dialog.open(FormDeletePatientComponent, {
      data: {
        id: this.selectedPatient.id,
        patientName: `${this.selectedPatient.firstName} ${this.selectedPatient.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // To refresh the list
      this.listRef.refreshList();
    });
  }

}

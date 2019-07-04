import { Component, ViewChild } from '@angular/core';
import { PrescriptionColumns, Prescription } from '../_models';
import { ListComponent } from '../list/list.component';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { FormDeletePrescriptionComponent } from '../form-delete-prescription/form-delete-prescription.component';
import { PrescriptionService } from '../_services/prescription.service';
import { map, tap } from 'rxjs/operators';
import { FormNewPrescriptionComponent } from '../form-new-prescription/form-new-prescription.component';

/**
 * Renders a list of prescriptions.
 * 
 * Can dynamically render bottom sheet menu and dialog components for `Prescription` business logic.
 */
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {

  selectedPrescription;
  prescriptionObservable;
  listColumns = PrescriptionColumns;

  @ViewChild(ListComponent) listRef: ListComponent;

  constructor(
    private prescriptionService: PrescriptionService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) {
    this.prescriptionObservable = prescriptionService.getAll().pipe(
      // @ts-ignore: prescriptions = Array<Prescription> ???
      map((prescriptions: Array<Prescription>) => {
        return prescriptions.map(prescription => {
          let flatObj = {
            ...prescription,
            firstName: prescription.patient.firstName,
            lastName: prescription.patient.lastName,
            patientId: prescription.patient.id
          };
          delete flatObj.patient;
          return flatObj;
        });
      })
    );
  }

  handlePrescriptionOnClick(e) {
    this.selectedPrescription = e;
    this.openBottomSheet();
  }

  openBottomSheet() {
    const sheet = this.bottomSheet.open(BottomSheetComponent, {
      hasBackdrop: true,
      data: {
        buttons: [
          {
            "id": "update_prescription",
            "icon": "receipt",
            "text": "Ansehen...",
            "description": `Rezept ansehen/bearbeiten`
          },
          {
            "id": "delete_prescription",
            "icon": "delete",
            "text": "Löschen...",
            "description": `Rezept löschen`
          }
        ],
        title: this.selectedPrescription.name
      }
    });
    sheet.afterDismissed().subscribe((buttonId) => {
      this.handleBottomSheetButton(buttonId);
    });
  }

  handleBottomSheetButton(buttonId) {
    switch (buttonId) {
      case 'delete_prescription':
        this.openDeletePrescriptionDialog();
        break;
      case 'update_prescription':
        this.openUpdatePrescriptionDialog();
        break;
      default:
        break;
    }
  }

  openDeletePrescriptionDialog() {
    const dialogRef = this.dialog.open(FormDeletePrescriptionComponent, {
      data: {
        id: this.selectedPrescription.id,
        prescriptionName: this.selectedPrescription.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Refresh the list
      this.listRef.refreshList();
    });
  }

  openUpdatePrescriptionDialog() {
    const dialogRef = this.dialog.open(FormNewPrescriptionComponent, {
      data: {
        prescription: this.selectedPrescription,
        patientName: `${this.selectedPrescription.firstName} ${this.selectedPrescription.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Refresh the list
      this.listRef.refreshList();
    });
  }

}

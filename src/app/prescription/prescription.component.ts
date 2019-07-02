import { Component, ViewChild } from '@angular/core';
import { PrescriptionColumns } from '../_models';
import { ListComponent } from '../list/list.component';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { FormDeletePrescriptionComponent } from '../form-delete-prescription/form-delete-prescription.component';
import { PrescriptionService } from '../_services/prescription.service';

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
    this.prescriptionObservable = prescriptionService.getAll();
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

}

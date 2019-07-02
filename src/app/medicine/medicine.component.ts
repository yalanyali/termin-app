import { Component, ViewChild } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { MedicineColumns } from '../_models';
import { MedicineService } from '../_services/medicine.service';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { FormDeleteMedicineComponent } from '../form-delete-medicine/form-delete-medicine.component';


/**
 * Renders a list of medicine.
 * 
 * Can dynamically render bottom sheet menu and dialog components for `Medicine` business logic.
 */
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent {

  selectedMedicine;
  medicineObservable;
  listColumns = MedicineColumns;

  @ViewChild(ListComponent) listRef: ListComponent;

  constructor(
    private medicineService: MedicineService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) {
    this.medicineObservable = medicineService.getAll();
  }

  handleMedicineOnClick(e) {
    this.selectedMedicine = e;
    this.openBottomSheet();
  }

  openBottomSheet() {
    const sheet = this.bottomSheet.open(BottomSheetComponent, {
      hasBackdrop: true,
      data: {
        buttons: [
          {
            "id": "delete_medicine",
            "icon": "delete",
            "text": "Löschen...",
            "description": `Medikamentdaten löschen`
          }
        ],
        title: this.selectedMedicine.name
      }
    });
    sheet.afterDismissed().subscribe((buttonId) => {
      this.handleBottomSheetButton(buttonId);
    });
  }

  handleBottomSheetButton(buttonId) {
    switch (buttonId) {
      case 'delete_medicine':
          this.openDeleteMedicineDialog();
          break;
      default:
        break;
    }
  }

  openDeleteMedicineDialog() {
    const dialogRef = this.dialog.open(FormDeleteMedicineComponent, {
      data: {
        id: this.selectedMedicine.id,
        medicineName: this.selectedMedicine.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Refresh the list
      this.listRef.refreshList();
    });
  }

}

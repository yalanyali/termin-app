import { Component, OnInit, ViewChild } from '@angular/core';

import { MatBottomSheet, MatDialog } from '@angular/material';

import { AppointmentColumns } from '../_models';
import { AppointmentService } from '../_services';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { FormNewAppointmentComponent } from '../form-new-appointment/form-new-appointment.component';
import { FormNewPatientComponent } from '../form-new-patient/form-new-patient.component';
import { ListComponent } from '../list/list.component';
import { map, mapTo } from 'rxjs/operators';
import { FormDeleteAppointmentComponent } from '../form-delete-appointment/form-delete-appointment.component';
import { FormAppointmentAddNoteComponent } from '../form-appointment-add-note/form-appointment-add-note.component';

/**
 * Renders a list of appointments.
 * 
 * Can dynamically render bottom sheet menu and dialog components for `Appointment` business logic.
 */
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  selectedAppointment;
  appointmentObservable;
  listColumns = AppointmentColumns;

  @ViewChild(ListComponent) listRef: ListComponent;

  constructor(
    private appointmentService: AppointmentService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) {
    this.appointmentObservable = appointmentService.getAll().pipe(
      // @ts-ignore: Appointment[] !== Appointment ???
      map((appointments: Appointment[]) => {
        return appointments.map(appointment => {
          let flatObj = {
            ...appointment,
            firstName: appointment.patient.firstName,
            lastName: appointment.patient.lastName,
            patientId: appointment.patient.id,
            description: appointment.description !== 'undefined' ? appointment.description : 'Keine Angabe'
          }
          delete flatObj.patient
          return flatObj
        })
      })
    )
  }

  ngOnInit() {
    // this.appointmentObservable.subscribe(a => console.log(a))
  }

  handleAppointmentOnClick(e) {
    this.selectedAppointment = e;
    this.openBottomSheet();
  }

  openBottomSheet() {
    const sheet = this.bottomSheet.open(BottomSheetComponent, {
      hasBackdrop: true,
      data: {
        buttons: [
          {
            "id": "add_appointment_record",
            "icon": "add_comment",
            "text": "Notizen hinzufügen...",
            "description": `Notizen zum Termin hinzufügen`
          },
          {
            "id": "update_appointment",
            "icon": "update",
            "text": "Termin bearbeiten...",
            "description": 'Datum/Notizen des Termins bearbeiten'//`Alle Daten von ${this.selectedAppointment.firstName} ${this.selectedAppointment.lastName} löschen`
          },
          {
            "id": "delete_appointment",
            "icon": "alarm_off",
            "text": "Termin absagen...",
            "description": `Termindaten löschen`
          }
        ],
        title: `Termin von ${this.selectedAppointment.firstName} ${this.selectedAppointment.lastName}: ${this.selectedAppointment.dateTime}`,
        subtitle: this.selectedAppointment.appointmentRecord.notes ? `Notizen: ${this.selectedAppointment.appointmentRecord.notes}` : '',
      }
    });
    sheet.afterDismissed().subscribe((buttonId) => {
      this.handleBottomSheetButton(buttonId);
    });
  }

  handleBottomSheetButton(buttonId) {
    switch (buttonId) {
      case 'add_appointment_record':
        this.openAppointmentRecordDialog();
        break;
      case 'update_appointment':
        this.openUpdateAppointmentDialog();
        break;
      case 'delete_appointment':
          this.openDeleteAppointmentDialog();
          break;
      default:
        break;
    }
  }

  openAppointmentRecordDialog() {
    const dialogRef = this.dialog.open(FormAppointmentAddNoteComponent, {
      data: {
        id: this.selectedAppointment.id,
        patientName: `${this.selectedAppointment.firstName} ${this.selectedAppointment.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  openUpdateAppointmentDialog() {
    const dialogRef = this.dialog.open(FormNewAppointmentComponent, {
      data: {
        appointment: {
          id: this.selectedAppointment.id
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // To refresh the list
      this.listRef.refreshList();
    });
  }

  openDeleteAppointmentDialog() {
    const dialogRef = this.dialog.open(FormDeleteAppointmentComponent, {
      data: {
        id: this.selectedAppointment.id,
        patientName: `${this.selectedAppointment.firstName} ${this.selectedAppointment.lastName}`,
        dateTime: this.selectedAppointment.dateTime
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // To refresh the list
      this.listRef.refreshList();
    });
  }

}

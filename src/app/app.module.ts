import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { routing } from './app.routing';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatPaginatorModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorIntl,
  MatSortModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatDatepickerModule,
  MatButtonToggleModule,
  DateAdapter,
  MatStepperModule,
  MatRadioModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatSlideToggleModule,
  MatExpansionModule
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { CalendarModule, DateAdapter as DateAdapterCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { getGermanPaginatorIntl } from './list/german-paginator-intl';
import { ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { PatientComponent } from './patient/patient.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { FormNewPatientComponent } from './form-new-patient/form-new-patient.component';
import { FormNewAppointmentComponent } from './form-new-appointment/form-new-appointment.component';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { FormDeletePatientComponent } from './form-delete-patient/form-delete-patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormDeleteAppointmentComponent } from './form-delete-appointment/form-delete-appointment.component';
import { RequestInterceptor } from './_helpers/request.interceptor';
import { FormAppointmentAddNoteComponent } from './form-appointment-add-note/form-appointment-add-note.component';
import { FormNewPrescriptionComponent } from './form-new-prescription/form-new-prescription.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { FormDeleteMedicineComponent } from './form-delete-medicine/form-delete-medicine.component';
import { FormDeletePrescriptionComponent } from './form-delete-prescription/form-delete-prescription.component';



registerLocaleData(localeDe);

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    // Calendar
    CalendarModule.forRoot({
      provide: DateAdapterCalendar,
      useFactory: adapterFactory
    }),

    // Material
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatRadioModule,
    MatChipsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListComponent,
    NavigationComponent,
    ContentCardComponent,
    PatientComponent,
    BottomSheetComponent,
    FormNewPatientComponent,
    FormNewAppointmentComponent,
    DatetimepickerComponent,
    FormDeletePatientComponent,
    AppointmentComponent,
    CalendarComponent,
    FormDeleteAppointmentComponent,
    FormAppointmentAddNoteComponent,
    FormNewPrescriptionComponent,
    MedicineComponent,
    PrescriptionComponent,
    FormDeleteMedicineComponent,
    FormDeletePrescriptionComponent
  ],
  entryComponents: [
    BottomSheetComponent,
    FormNewPatientComponent,
    FormDeletePatientComponent,
    FormNewAppointmentComponent,
    FormDeleteAppointmentComponent,
    FormAppointmentAddNoteComponent,
    FormNewPrescriptionComponent,
    FormDeleteMedicineComponent,
    FormDeletePrescriptionComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: MatPaginatorIntl, useValue: getGermanPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

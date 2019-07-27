import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MedicineComponent } from './medicine/medicine.component';


const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard] },
  { path: 'prescription', component: PrescriptionComponent, canActivate: [AuthGuard] },
  { path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  // Since it's an app, we don't need a 404 page
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

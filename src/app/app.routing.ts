import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'patient', component: PatientComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
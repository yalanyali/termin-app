import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient, Appointment } from '../_models';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientService {

  // patientUrl = "https://termin-api.herokuapp.com/api/patient";
  api: string = environment.apiRemote;

  patientUrl: string = `${this.api}/patient`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Patient[]>(this.patientUrl);
  }

  addAppointment(patientId: Number, appointment: Appointment): Observable<any> {

    const formData = new FormData();

    Object.keys(appointment).map(key => {
      formData.append(key, appointment[key]);
    });

    return this.http.post<any>(`${this.patientUrl}/${patientId}/appointment`, formData);
  }

  addNewPatient(patient: Patient): Observable<any> {

    const formData = new FormData();

    Object.keys(patient).map(key => {
      formData.append(key, patient[key]);
    });

    return this.http.post<any>(`${this.patientUrl}`, formData);
  }

  deletePatient(patientId: Number): Observable<any> {
    return this.http.delete<any>(`${this.patientUrl}/${patientId}`);
  }

  checkUniqueValue(value: string, type: string) {
    const formData = new FormData();
    formData.append("value", value);
    // console.log(type, value);
    return this.http.post(`${this.patientUrl}/check/${type}`, formData);
  }

}
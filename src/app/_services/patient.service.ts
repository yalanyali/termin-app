import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient, Appointment, Prescription } from '../_models';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import * as _moment from 'moment';
const moment = _moment;

/**
 * Communication service for `/patient` endpoint with standard CRUD functions.
 */
@Injectable({ providedIn: 'root' })
export class PatientService {

  api: string = environment.apiUrl;

  patientUrl: string = `${this.api}/patient`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Patient[]>(this.patientUrl);
  }

  getPatient(patientId: Number) {
    return this.http.get<Patient>(`${this.patientUrl}/${patientId}`);
  }

  addAppointment(patientId: Number, appointment: Appointment): Observable<any> {
    return this.http.post<any>(`${this.patientUrl}/${patientId}/appointment`, appointment);
  }

  addPrescription(patientId: Number, prescription: Prescription): Observable<any> {
    prescription.dateTime = moment(Date.now()).format('DD.MM.YYYY HH:mm');
    console.log(prescription);
    return this.http.post<any>(`${this.patientUrl}/${patientId}/prescription`, prescription);
  }

  addNewPatient(patient: Patient): Observable<any> {
    return this.http.post<any>(`${this.patientUrl}`, patient);
  }

  updatePatient(patientId: Number, patient: Patient): Observable<any> {
    return this.http.put<any>(`${this.patientUrl}/${patientId}`, patient);
  }

  deletePatient(patientId: Number): Observable<any> {
    return this.http.delete<any>(`${this.patientUrl}/${patientId}`);
  }

  checkUniqueValue(value: string, type: string) {
    const reqBody = {
      "type": type,
      "value": value
    }
    return this.http.post(`${this.patientUrl}/check`, reqBody);
  }

}
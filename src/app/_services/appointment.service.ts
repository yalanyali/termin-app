import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Appointment, AppointmentRecord } from '../_models';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Communication service for `/appointment` endpoint with standard CRUD functions.
 */
@Injectable({ providedIn: 'root' })
export class AppointmentService {

  api: string = environment.apiUrl;
  appointmentUrl: string = `${this.api}/appointment`

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Appointment>(this.appointmentUrl)
  }

  deleteAppointment(appointmentId: Number): Observable<any> {
    return this.http.delete<any>(`${this.appointmentUrl}/${appointmentId}`);
  }

  updateAppointment(appointmentId: Number, appointment: Appointment): Observable<any> {
    return this.http.put<any>(`${this.appointmentUrl}/${appointmentId}`, appointment);
  }

  addNotes(appointmentId: Number, notes: AppointmentRecord): Observable<any> {
    return this.http.post<any>(`${this.appointmentUrl}/${appointmentId}/notes`, notes);
  }
}

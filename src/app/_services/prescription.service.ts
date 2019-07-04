import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Prescription } from '../_models';

/**
 * Communication service for `/prescription` endpoint with standard CRUD functions.
 */
@Injectable({ providedIn: 'root' })
export class PrescriptionService {

  api: string = environment.apiUrl;
  prescriptionUrl: string = `${this.api}/prescription`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Prescription>(this.prescriptionUrl);
  }

  deletePrescription(prescriptionId: Number): Observable<any> {
    return this.http.delete<any>(`${this.prescriptionUrl}/${prescriptionId}`);
  }

  updatePrescription(prescriptionId: Number, prescription: Prescription): Observable<any> {
    console.log(prescription)
    return this.http.put<any>(`${this.prescriptionUrl}/${prescriptionId}`, prescription);
  }

}

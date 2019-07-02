import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Medicine } from '../_models';

/**
 * Communication service for `/medicine` endpoint with standard CRUD functions.
 */
@Injectable({ providedIn: 'root' })
export class MedicineService {

  api: string = environment.apiLocal;
  medicineUrl: string = `${this.api}/medicine`

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Medicine>(this.medicineUrl);
  }

  addNewMedicine(medicine: Medicine) {
      return this.http.post<any>(this.medicineUrl, medicine);
  }

  deleteMedicine(medicineId: Number): Observable<any> {
    return this.http.delete<any>(`${this.medicineUrl}/${medicineId}`);
  }

  updateMedicine(medicineId: Number, medicine: Medicine): Observable<any> {
    return this.http.put<any>(`${this.medicineUrl}/${medicineId}`, medicine);
  }

  autocomplete(value: String) {
    return this.http.get<Medicine>(`${this.medicineUrl}/search/${value}`);
  }

}

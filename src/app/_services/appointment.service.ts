import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Appointment } from '../_models';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

    api: string = environment.apiRemote;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Appointment>(`${this.api}/appointment`)
    }
}

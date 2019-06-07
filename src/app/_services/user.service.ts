import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

    api: string = environment.apiRemote;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User>(`${this.api}/patient`)
    }
}


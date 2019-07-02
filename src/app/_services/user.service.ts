import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

import { environment } from '../../environments/environment';

/**
 * Communication service for `/user` endpoint.
 * `/user` endpoint acts like an auth endpoint on backend server.
 */
@Injectable({ providedIn: 'root' })
export class UserService {

    api: string = environment.apiRemote;

    constructor(private http: HttpClient) { }

    getAll() {
        // A test request to verify data response
        // Any valid request would do
        return this.http.get<User>(`${this.api}/patient`)
    }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    api: string = environment.apiRemote;
    
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        const authHash = btoa(username + ':' + password);
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Basic ' + authHash
            })
        };

        // return this.http.get<any>(`https://termin-api.herokuapp.com/api/auth`, httpOptions)
        return this.http.get<any>(`${this.api}/auth`, httpOptions)
            .pipe(map(res => {
                if (res.success) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', authHash);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

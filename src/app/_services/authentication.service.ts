import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

/**
 * Authenticates with username and password using HttpClient.
 * Authentication hash is stored in local storage on successful login.
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    const authHash = btoa(username + ':' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + authHash
      })
    };

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

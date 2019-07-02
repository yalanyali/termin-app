import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor to manipulate headers on requests.
 * 
 * Sets `Authorization` header on all requests.
 * Sets `Content-Type` header on `POST` and `PUT` requests.
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add authorization header with basic auth credentials if available
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser}`
        }
      });
    }

    // Add Content-Type to post requests
    if (['POST', 'PUT'].includes(request.method)) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 1 read token

    let token = localStorage.getItem('token');

    // if token is found

    if (token) {
      //  if token found add it to header of req obj since obj is immutable so we need to trans form first
      let transformedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(transformedReq);
    } else {
      return next.handle(req);
    }
  }
  constructor() {}
}

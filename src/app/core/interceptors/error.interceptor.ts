import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authService: AuthService,
      private router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          //401 is Not Authorization 403 Expire Token
            if ([401,403].includes(err.status)) {
              this.authService.logout();
            }



              //const error = (err && err.error && err.error.message) || err.statusText;
            //console.error(err);
            return throwError(err);
        }))
    }
}

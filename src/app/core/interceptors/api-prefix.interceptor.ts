import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_urls } from '@shared/configs/api_url';
/**
 * Prefixes all requests not starting with `http[s]` with `environment.BASE_API`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!/^(http|https):/i.test(request.url)) {
    //   request = request.clone({
    //     url: this.environment.BASE_API_URL + request.url
    //   });
    // }

    request = request.clone({
      url: api_urls.LOCAL_API_URL + request.url ,
    });

    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { AccountService } from '../services/account.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) { }
  LoadingQue = <any>[];
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined && token !== '') {
      request = request.clone(
        ({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('cdp_token')}`,
          },
        }),
      );
    }

    if (request.url.indexOf('GetAutocompleteList') === -1
      && request.url.indexOf('GetAutocompleteByTagValueList') === -1
    ) {
      this.LoadingQue.push(request);
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.LoadingQue.pop();

        }
        return event;
      })
      ,
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //   this.router.navigateByUrl('login');
        // } else if (error.status === 403) {
        //   this.baseHelper.showErrorMSG('權限不足');
        //   this.router.navigateByUrl('home');
        // } else {
        //   this.baseHelper.showErrorMSG(error.statusText);
        // }
        return throwError(error);
      }),
    );
  }
}

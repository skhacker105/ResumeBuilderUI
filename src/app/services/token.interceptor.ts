import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.userService.loggedInUser.subscribe(u => {});
    const token = this.userService.user ? this.userService.user.token : null;
    if (token) {
      request = request.clone({
        setHeaders: { 'x-access-token': `${token}` }
      });
    }
    return next.handle(request)
    .pipe(
      catchError( (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.userService.logout();
          this.router.navigateByUrl('/');
        }
         return throwError(error);
       })
    );
  }
}

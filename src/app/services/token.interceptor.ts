import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.userService.loggedInUser.subscribe(u => {});
    const token = this.userService.user ? this.userService.user.token : null;
    if (token) {
      request = request.clone({
        setHeaders: { 'x-access-token': `${token}` }
      });
    }
    return next.handle(request);
  }
}

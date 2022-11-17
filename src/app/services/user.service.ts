import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _loggedInUser = new BehaviorSubject<IUser | undefined>(undefined);
  public loggedInUser = this._loggedInUser.asObservable();

  constructor(private http: HttpClient) {
    this.restoreLoggedInInfo();
  }

  restoreLoggedInInfo() {
    if (localStorage.getItem('user')) {
      const u=JSON.parse(localStorage.getItem('user') || '{}');
      this.setUser(u)
    }
  }

  getTokenInfo(token: string): Observable<IUser> {
    const url = environment.uersapi + '/info?token=' + token;
    return this.http.get<IUser>(url);
  }

  setUser(user: IUser | undefined) {
    this._loggedInUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.setUser(undefined);
    localStorage.removeItem('user');
  }
}

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
  get user(): IUser | undefined { return this._loggedInUser.value }

  constructor(private http: HttpClient) {
    this.restoreLoggedInInfo();
  }

  setLayout(layout: string) {
    if (this._loggedInUser.value)
      this._loggedInUser.value.layout = layout;
  }

  restoreLoggedInInfo() {
    if (localStorage.getItem('user')) {
      const u: IUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.setUser(u);
      setTimeout(() => {
        this.validateToken(u.token).subscribe({
          next: (r) => {
            this.getTokenInfo(u.token).subscribe({
              next: (usr) => this.setUser(usr),
              error: (err) => console.log('Error = ', err)
            })
          },
          error: (err) => console.log('Error = ', err)
        });
      }, 0);
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

  validateToken(token: string): Observable<IUser> {
    const url = environment.uersapi + '/validatetoken?token=' + token;
    return this.http.get<IUser>(url);
  }

  logout() {
    this.setUser(undefined);
    localStorage.removeItem('user');
  }
}

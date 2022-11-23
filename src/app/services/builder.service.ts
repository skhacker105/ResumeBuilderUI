import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIMessageResponse } from '../models/api-message-response';
import { IPersonal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  constructor(private http: HttpClient) { }

  getInfo(userId: string): Observable<IPersonal[]> {
    const url = environment.resumebuilderapi + '?userId='+userId;
    return this.http.get<IPersonal[]>(url);
  }

  saveInfo(userId: string, data: IPersonal): Observable<IAPIMessageResponse> {
    const url = environment.resumebuilderapi + '?userId='+userId;
    return this.http.post<IAPIMessageResponse>(url, data);
  }
}

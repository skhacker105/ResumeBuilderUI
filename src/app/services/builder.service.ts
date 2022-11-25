import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIMessageResponse } from '../models/api-message-response';
import { IProfilePicture } from '../models/image';
import { IPersonal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  constructor(private http: HttpClient) { }

  getInfo(userId: string): Observable<IPersonal[]> {
    const url = environment.resumebuilderapi + '?userId=' + userId;
    return this.http.get<IPersonal[]>(url);
  }

  saveInfo(userId: string, data: IPersonal): Observable<IAPIMessageResponse> {
    const url = environment.resumebuilderapi + '?userId=' + userId;
    return this.http.post<IAPIMessageResponse>(url, data);
  }

  loadImage(userId: string): Observable<IProfilePicture> {
    const url = environment.resumebuilderapi + '/profilepicture?userId=' + userId;
    return this.http.get<IProfilePicture>(url);
  }

  uploadImage(userId: string, image: string): Observable<any> {
    const url = environment.resumebuilderapi + '/profilepicture';
    const fd = new FormData();
    fd.append('userId', userId);
    fd.append('image', image);
    return this.http.post<any>(url, fd);
  }
}

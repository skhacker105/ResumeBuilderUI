import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThemesComponent } from '../components/preview/themes/themes.component';
import { DefaultComponent } from '../components/preview/views/default/default.component';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  public printMode = new BehaviorSubject<boolean>(false);
  private mobileScreenSize = 690;
  public mobileView = new BehaviorSubject<boolean>(false);

  public prvGrid = {
    type: 'default',
    view: ThemesComponent,
    name: 'Default'
  };
  public lstPreviews = [
    {
      type: 'default',
      view: DefaultComponent,
      name: 'Default',
      image: '../../../../assets/themes/default.PNG'
    }
  ];

  constructor(private http: HttpClient) { }

  setLayout(userId: string, layout: string): Observable<any> {
    const url = environment.uersapi + '/layout?userId=' + userId + '&layout=' + layout;
    return this.http.put<any>(url, {});
  }

  identifyView(width?: number) {
    width = width ? width : window.innerWidth;
    if (width <= this.mobileScreenSize) this.mobileView.next(true);
    else this.mobileView.next(false);
  }
}

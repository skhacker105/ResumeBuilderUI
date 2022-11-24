import { Injectable, Type } from '@angular/core';
import { ThemesComponent } from '../components/preview/themes/themes.component';
import { DefaultComponent } from '../components/preview/views/default/default.component';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  public prvGrid = {
    type: 'default',
    view: ThemesComponent,
    name: 'Default'
  };
  public lstPreviews = [
    {
      type: 'default',
      view: DefaultComponent,
      name: 'Default'
    }
  ];

  constructor() { }
}

import { EventEmitter, Injectable, Type } from '@angular/core';
import { ThemesComponent } from '../components/preview/themes/themes.component';
import { DefaultComponent } from '../components/preview/views/default/default.component';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  public printMode = new EventEmitter<boolean>(false);

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

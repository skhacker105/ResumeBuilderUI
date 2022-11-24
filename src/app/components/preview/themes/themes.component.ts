import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPersonal } from 'src/app/models/personal';
import { IPreview, IPreviewView } from 'src/app/models/preview-view';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, IPreviewView {

  @Input() public info: IPersonal | undefined;

  constructor(public previewService: PreviewService, private router: Router) { }

  ngOnInit(): void {
  }

  apply(theme: any) {
    theme = theme as IPreview;
    this.router.navigate(['/preview',
        this.info?.userId,
        theme.type
    ])
  }

}

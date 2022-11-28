import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IPersonal } from 'src/app/models/personal';
import { IPreview, IPreviewView } from 'src/app/models/preview-view';
import { PreviewService } from 'src/app/services/preview.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, IPreviewView {

  @Input() public info: IPersonal | undefined;
  @Input() public pic: string | undefined;
  duration = 3;

  constructor(public previewService: PreviewService, private router: Router,
    private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  isDefaultLayout(theme: any): boolean {
    return this.userService.user?.layout === theme.type;
  }

  apply(theme: any) {
    theme = theme as IPreview;
    this.router.navigate(['/preview',
      this.info?.userId,
      theme.type
    ])
  }

  setAndApply(theme: any) {
    if (!this.userService.user) return;
    this.previewService.setLayout(this.userService.user._id, theme.type).subscribe({
      next: (res) => {
        this.userService.setLayout(theme.type);
        this._snackBar.open(res.message, '', {
          duration: this.duration * 1000
        });
        this.router.navigate(['/preview',
          this.info?.userId,
          theme.type
        ]);
      },
      error: (err) => {
        this._snackBar.open(err.error, '', {
          duration: this.duration * 1000
        });
      }
    });
  }

}

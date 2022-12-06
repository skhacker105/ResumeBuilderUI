import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SupportFunctions } from './helpers/support-functions';
import { PreviewService } from './services/preview.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ResumeBuilderUI';
  isActive = new Subject();
  duration = 3;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
    private _snackBar: MatSnackBar, private previewService: PreviewService) { }

  ngOnInit(): void {
    this.onSizeInit();
    this.saveVisitor();
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.isActive))
      .subscribe(params => {
        this.loadUserForToken(params);
      });
  }

  onSizeInit() {
    this.previewService.identifyView();
  }

  onResize(event: any) {
    this.previewService.identifyView(event.target.innerWidth);
  }

  loadUserForToken(params: any) {
    const token = params['token'];
    if (!token) return
    else this.userService.getTokenInfo(token)
      .pipe(takeUntil(this.isActive))
      .subscribe({
        next: (res) => {
          this.userService.setUser(res);
        },
        error: (err) => { }
      });
  }

  saveVisitor() {
    this.userService.addVisitor(SupportFunctions.getClientInfo())
      .pipe(takeUntil(this.isActive))
      .subscribe({
        next: (res) => { },
        error: (err) => this._snackBar.open(err.error, '', {
          duration: this.duration * 1000
        })
      });
  }

  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }
}

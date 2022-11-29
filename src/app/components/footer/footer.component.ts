import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { PreviewService } from 'src/app/services/preview.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  user: IUser | undefined;
  isActive = new Subject();
  printMode: boolean | undefined;
  duration = 3;
  visitorcount = '00';

  constructor(public userService: UserService, private ps: PreviewService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.loggedInUser
      .pipe(takeUntil(this.isActive))
      .subscribe(res => this.user = res);
    this.ps.printMode
      .pipe(takeUntil(this.isActive))
      .subscribe({
        next: (res) => this.printMode = res,
        error: (err) => console.log('error = ', err.error)
      });
      this.loadVisitorCount();
  }

  loadVisitorCount() {
    this.userService.getVisitorsCount()
    .pipe(takeUntil(this.isActive))
    .subscribe({
      next: (res) => this.visitorcount = res.message,
      error: (err) => {}
    });
  }

  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

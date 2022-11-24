import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ResumeBuilderUI';
  isActive = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.isActive))
    .subscribe(params => {
      this.loadUserForToken(params);
    });
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
  
  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }
}

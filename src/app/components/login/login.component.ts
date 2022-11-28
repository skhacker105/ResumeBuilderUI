import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: IUser | undefined;
  isActive = new Subject();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.loggedInUser
      .pipe(takeUntil(this.isActive))
      .subscribe(user => {
        this.user = user;
      });
  }

  proceedToLogin() {
    document.location.href = environment.loginurl + '?returnURL=' + document.location.origin;
  }

  loadPreview() {
    this.router.navigate(['/preview',
      this.userService.user?._id,
      this.userService.user?.layout
    ]);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe(user => {
      this.user = user;
    });
  }

  proceedToLogin() {
    document.location.href = environment.loginurl + '?returnURL=' + document.location.origin;
  }

  logout() {
    this.userService.logout();
  }

}

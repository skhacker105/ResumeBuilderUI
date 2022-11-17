import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser | undefined;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe(res => this.user = res);
  }

}

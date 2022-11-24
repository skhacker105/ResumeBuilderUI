import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: IUser | undefined;
  isActive = new Subject();
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInUser
    .pipe(takeUntil(this.isActive))
    .subscribe(res => this.user = res);
  }
  
  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

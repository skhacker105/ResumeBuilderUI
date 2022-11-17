import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ResumeBuilderUI';

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.loadUserForToken(params);
    });
  }

  loadUserForToken(params: any) {
    const token = params['token'];
    if (!token) return
    else this.userService.getTokenInfo(token).subscribe({
      next: (res) => {
        this.userService.setUser(res);
      },
      error: (err) => { }
    });
  }
}

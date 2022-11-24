import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IPersonal } from 'src/app/models/personal';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  userId: string | undefined;
  info: IPersonal | undefined;
  isActive = new Subject();

  constructor(private route: ActivatedRoute, private builderService: BuilderService) { }

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.isActive))
    .subscribe(params => {
      this.userId = params['id'];
      this.loadUserInfo();
    });
  }

  loadUserInfo() {
    if (!this.userId) return;
    this.builderService.getInfo(this.userId)
    .pipe(takeUntil(this.isActive))
    .subscribe({
      next: (info) => {
        if (info && info.length) this.info = info[0];
      },
      error: (err) => {
        console.log('info load error = ', err);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

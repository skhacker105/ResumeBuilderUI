import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  howToSteps = [
    {
      stepNumber: '1',
      image: "../../../assets/howtosteps/01.PNG",
      desc: "Login to this website using your account credentials"
    },
    {
      stepNumber: '2',
      image: "../../../assets/howtosteps/02.png",
      desc: "Select \"Update Information\". Enter you resume details in all sections."
    },
    {
      stepNumber: '3',
      image: "../../../assets/howtosteps/03.png",
      desc: "After information update click \"Select Layout\" for your resume."
    },
    {
      stepNumber: '4',
      image: "../../../assets/howtosteps/04.png",
      desc: "Click on \"Apply\" to route to your resume view."
    },
    {
      stepNumber: '5',
      image: "../../../assets/howtosteps/05.png",
      desc: "Click on \"Set As Default\" to set the view as dafulat for your account."
    }
  ];
  rowHeight = "350px";
  isMobileView = false;
  isActive = new Subject();
  breakpoint: number | undefined;

  constructor(private previewService: PreviewService, private router: Router) { }

  ngOnInit(): void {
    this.previewService.mobileView
    .pipe(takeUntil(this.isActive))
    .subscribe(mobileView => {
      this.isMobileView = mobileView;
      this.breakpoint = mobileView ? 1 : this.howToSteps.length;
      this.rowHeight = !mobileView  ? '350px' : '260px';
    });
  }

  startBuilding() {
    this.router.navigateByUrl('/information');
  }

  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

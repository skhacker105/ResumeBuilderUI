import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResumeViewDirective } from 'src/app/directives/resume-view.directive';
import { IPersonal } from 'src/app/models/personal';
import { IPreviewView } from 'src/app/models/preview-view';
import { BuilderService } from 'src/app/services/builder.service';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  userId: string | undefined;
  view: string | undefined;
  info: IPersonal | undefined;
  isActive = new Subject();
  @ViewChild(ResumeViewDirective, { static: true }) private appResumeView!: ResumeViewDirective;

  constructor(private route: ActivatedRoute, private builderService: BuilderService, private previewService: PreviewService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.isActive))
      .subscribe(params => {
        this.userId = params['id'];
        this.view = params['view'];
        this.loadUserInfo();
      });
  }

  @HostListener("window:afterprint", [])
  onWindowAfterPrint() {
    this.previewService.printMode.next(false);
  }

  loadUserInfo() {
    if (!this.userId) return;
    this.builderService.getInfo(this.userId)
      .pipe(takeUntil(this.isActive))
      .subscribe({
        next: (info) => {
          if (info && info.length) this.info = info[0];
          this.loadComponent();
        },
        error: (err) => {
          console.log('info load error = ', err);
          this.loadComponent();
        }
      });
  }

  loadComponent() {
    const viewContainerRef = this.appResumeView.viewContainerRef;
    viewContainerRef.clear();
    if (!this.view) { // load themes list
      this.createDynamicComponent(viewContainerRef, this.previewService.prvGrid.view)
    } else {
      const view = this.previewService.lstPreviews.find(x => x.type === this.view);
      view ? this.createDynamicComponent(viewContainerRef, view.view) : null;
    }
  }

  createDynamicComponent(viewContainerRef: ViewContainerRef, view: any) {
    const componentRef = viewContainerRef.createComponent<IPreviewView>(view);
    componentRef.instance.info = this.info;
  }

  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

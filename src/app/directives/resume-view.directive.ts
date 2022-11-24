import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appResumeView]'
})
export class ResumeViewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

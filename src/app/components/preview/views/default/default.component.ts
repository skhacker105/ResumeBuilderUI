import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IPersonal } from 'src/app/models/personal';
import { IPreviewView } from 'src/app/models/preview-view';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, IPreviewView {

  @Input() public info: IPersonal | undefined;
  printMode: boolean | undefined;
  isActive = new Subject();

  constructor(public ps: PreviewService) { }

  ngOnInit(): void {
    this.ps.printMode
    .pipe(takeUntil(this.isActive))
    .subscribe({
      next: (res) => this.printMode = res,
      error: (err) => console.log('error = ', err.error)
    });
    console.log('info = ', this.info);
  }

  print() {
    this.ps.printMode.next(true);
    window.print();
  }

}

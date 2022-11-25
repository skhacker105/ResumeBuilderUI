import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IPersonal } from 'src/app/models/personal';
import { IPreviewView } from 'src/app/models/preview-view';
import { IUser } from 'src/app/models/user';
import { BuilderService } from 'src/app/services/builder.service';
import { PreviewService } from 'src/app/services/preview.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, IPreviewView {

  @Input() public info: IPersonal | undefined;
  @Input() public pic: string | undefined;
  user: IUser | undefined;
  printMode: boolean | undefined;
  isActive = new Subject();
  exp_dataSource: any[] = [];
  exp_columns: string[] = ['company', 'duration', 'role', 'package', 'projects'];

  constructor(public ps: PreviewService, public builderService: BuilderService, private userService: UserService) { }

  ngOnInit(): void {
    this.ps.printMode
      .subscribe(res => {
        this.printMode = res
      });
  }

  print() {
    this.ps.printMode.next(true);
    setTimeout(() => { window.print(); }, 0)
  }

  get skills(): string[] {
    let result: string[] = [];
    this.info?.expertises.forEach(e => this.addToArrayIfNotExists(result, e));
    this.info?.professional.forEach(p => {
      p.skillsUsed.forEach(s => this.addToArrayIfNotExists(result, s));
    });
    return result.sort();
  }

  addToArrayIfNotExists(arr: string[], d: string): string[] {
    if (arr.indexOf(d) === -1) {
      arr.push(d)
    }
    return arr;
  }

}

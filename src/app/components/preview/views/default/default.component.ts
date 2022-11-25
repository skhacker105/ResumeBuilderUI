import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IPersonal } from 'src/app/models/personal';
import { IPreviewView } from 'src/app/models/preview-view';
import { IUser } from 'src/app/models/user';
import { BuilderService } from 'src/app/services/builder.service';
import { PreviewService } from 'src/app/services/preview.service';
import { UserService } from 'src/app/services/user.service';
import { IExperience } from './models/experience';

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
  exp_dataSource: IExperience[] = [];
  exp_columns: string[] = ['company', 'duration', 'role', 'package', 'projects'];

  constructor(public ps: PreviewService, public builderService: BuilderService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ps.printMode
      .subscribe(res => {
        this.printMode = res
      });
    this.createExperienceData();
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
  get experience(): string {
    if (!this.info) return '';
    let today = new Date();
    let start = new Date(this.info?.jobStartDate);
    return SupportFunctions.dateDiff(today, start);
  }

  addToArrayIfNotExists(arr: string[], d: string): string[] {
    if (arr.indexOf(d) === -1) {
      arr.push(d)
    }
    return arr;
  }

  createExperienceData() {
    let arr: IExperience[] = [];
    this.info?.professional.forEach(p => {
      const rd = p.relievingDate ? new Date(p.relievingDate) : new Date();
      const duration = SupportFunctions.dateDiff(rd, new Date(p.joiningDate))
      const st = this.datePipe.transform(p.joiningDate, 'dd MMM yy');
      const ed = p.relievingDate? this.datePipe.transform(p.relievingDate, 'dd MMM yy') : 'Till Now';
      let d: IExperience = {
        company: p.companyName,
        dates: st + ' - ' + ed,
        duration: duration,
        package: p.salary.toString(),
        projects: [],
        role: p.employeeRole ? p.employeeRole : 'NA'
      };
      arr.push(d);
    });
    this.exp_dataSource = arr;
  }

}

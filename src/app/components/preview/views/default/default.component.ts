import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IDuration } from 'src/app/models/duration';
import { IEducation } from 'src/app/models/education';
import { IFamily } from 'src/app/models/family';
import { ILanguage } from 'src/app/models/language';
import { IPersonal } from 'src/app/models/personal';
import { IPreviewView } from 'src/app/models/preview-view';
import { IProfessional } from 'src/app/models/professional';
import { IUser } from 'src/app/models/user';
import { BuilderService } from 'src/app/services/builder.service';
import { PreviewService } from 'src/app/services/preview.service';
import { IExperience } from './models/experience';
import { IExpertiseDetail } from './models/experience-detail';

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
  exp_columns: string[] = ['company', 'duration', 'role', 'skills', 'projects'];
  edu_dataSource: IEducation[] = [];
  edu_columns: string[] = ['course', 'details', 'duration', 'projects'];

  constructor(public ps: PreviewService, public builderService: BuilderService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ps.printMode
      .subscribe(res => {
        this.printMode = res
      });
    this.createExperienceData();
    this.createEducationData();
  }

  print() {
    this.ps.printMode.next(true);
    setTimeout(() => { window.print(); }, 0)
  }

  get languages(): ILanguage[] {
    return this.info?.languages ? this.info?.languages : [];
  }
  get families(): IFamily[] {
    return this.info?.familyMembers ? this.info?.familyMembers : [];
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
  get email(): string | undefined {
    return this.info?.currentAddress ? this.info?.currentAddress.email : this.info?.permanentAddress?.email
  }
  get experienceDetails(): IExpertiseDetail[] {
    let skillsAdded: IExpertiseDetail[] = []
    if (!this.info) return skillsAdded;
    if (this.skills && this.skills.length > 0) {
      this.skills.forEach(ts => {
        const short_ts = SupportFunctions.removeNumbers(ts);
        // if skill is not added then add it in skillsAdded
        if (skillsAdded.findIndex(x => x.name === short_ts) === -1) {
          let data = {
            name: short_ts,
            duration: {
              years: 0, months: 0, days: 0
            }
          };
          skillsAdded.push(data);
          // find the skill in professional info list
          this.info?.professional.forEach(p => {
            if (p.skillsUsed.findIndex(s => SupportFunctions.removeNumbers(s) === short_ts) >= 0) {
              const st = new Date(p.joiningDate);
              const ed = p.relievingDate ? new Date(p.relievingDate) : new Date();
              const duration = SupportFunctions.dateDiffVector(ed, st);
              data.duration.years += duration.years ? duration.years : 0
              data.duration.months += duration.months ? duration.months : 0
              data.duration.days += duration.days ? duration.days : 0
            }
          });
        }
      });
    }
    skillsAdded = skillsAdded.sort((a, b) => this.summariseDurationInDays(b.duration) - this.summariseDurationInDays(a.duration));
    // remove data with no experience
    skillsAdded = skillsAdded.filter(ss => this.summariseDurationInDays(ss.duration) > 0)
    return skillsAdded;
  }

  professionalSkills(p: IProfessional): string[] {
    return p.skillsUsed;
  }

  summariseDurationInDays(d: IDuration): number {
    return ((d.years ? d.years : 0) * 12 * 31) + ((d.months ? d.months : 0) * 31) + (d.days ? d.days : 0)
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
      const st = this.datePipe.transform(p.joiningDate, 'MMM yy');
      const ed = p.relievingDate ? this.datePipe.transform(p.relievingDate, 'MMM yy') : '';
      let d: IExperience = {
        company: p.companyName,
        dates: st + (ed && ed.length > 0 ? ' - ' + ed : ''),
        duration: duration,
        package: p.salary,
        projects: p.projects,
        role: p.employeeRole ? p.employeeRole : 'NA',
        skillsUsed: p.skillsUsed
      };
      arr.push(d);
    });
    this.exp_dataSource = arr;
  }

  createEducationData() {
    let arr: IEducation[] = [];
    this.info?.education.forEach(e => {
      let obj: IEducation = {
        course: e.course,
        marksScored: e.marksScored,
        maxPossibleScore: e.maxPossibleScore,
        specialization: e.specialization,
        startedOn: e.startedOn,
        st: this.datePipe.transform(e.startedOn, 'dd MMM yy'),
        ed: e.endedOn ? this.datePipe.transform(e.endedOn, 'dd MMM yy') : '',
        type: e.type,
        university: e.university,
        endedOn: e.endedOn,
        projects: e.projects
      };
      arr.push(obj);
    });
    this.edu_dataSource = arr;
  }

}

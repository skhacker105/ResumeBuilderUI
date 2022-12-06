import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ICertification } from "../models/certifications";
import { IDuration } from "../models/duration";
import { IEducation } from "../models/education";
import { IFamily } from "../models/family";
import { ILanguage } from "../models/language";
import { IProfessional } from "../models/professional";
import { IProjects } from "../models/projects";
import { EducationTypes } from "./education-type-enum";
import { ProfessionalTypes } from "./professional-type-enum";

export class SupportFunctions {
  public static isNumber(val: any): boolean {
    return val || val === 0 ? typeof val === 'number' : false;
  }

  public static generateProjectsForm(fb: FormBuilder, projects?: IProjects[]): FormArray | any {
    if (projects && projects.length > 0) {
      return fb.array(projects.map(p => {
        return this.newProjectForm(fb, p);
      }));
    }
    return fb.array([]);
  }

  public static newProjectForm(fb: FormBuilder, data?: IProjects): FormGroup {
    return fb.group({
      title: [data?.title, Validators.required],
      projectDuration: SupportFunctions.newDurationForm(fb, data?.projectDuration),
      myContributions: [data?.myContributions, Validators.required],
      projectDetails: [data?.projectDetails, Validators.required],
      githubLink: [data?.githubLink]
    });
  }

  public static newDurationForm(fb: FormBuilder, data?: IDuration): FormGroup {
    return fb.group({
      years: [data?.years],
      months: [data?.months],
      days: [data?.days],
      hours: [data?.hours],
      minutes: [data?.minutes],
      seconds: [data?.seconds],
      milliseconds: [data?.milliseconds]
    });
  }

  public static newEducationForm(fb: FormBuilder, data?: IEducation): FormGroup {
    return fb.group({
      university: [data?.university, Validators.required],
      course: [data?.course, Validators.required],
      specialization: [data?.specialization, Validators.required],
      type: [data?.type ? data?.type : EducationTypes.FullTime, Validators.required],
      startedOn: [data?.startedOn, [Validators.required]],
      endedOn: [data?.endedOn],
      marksScored: [data?.marksScored, Validators.required],
      maxPossibleScore: [data ? data.maxPossibleScore : 100, Validators.required],
      projects: this.generateProjectsForm(fb, data?.projects)
    });
  }

  public static newProfessionalInfoForm(fb: FormBuilder, data?: IProfessional): FormGroup {
    return fb.group({
      isCurrent: [data?.isCurrent, Validators.required],
      type: [data ? data.type : ProfessionalTypes.FullTime, Validators.required],
      companyName: [data?.companyName, Validators.required],
      companyLocation: [data?.companyLocation, Validators.required],
      joiningDate: [data?.joiningDate, Validators.required],
      relievingDate: [data?.relievingDate],
      salary: [data?.salary, Validators.required],
      stipend: [data?.stipend],
      skillsUsed: [data?.skillsUsed ? data.skillsUsed : [], Validators.required],
      employeeRole: [data?.employeeRole],
      profileSummary: [data?.profileSummary],
      projects: this.generateProjectsForm(fb, data?.projects)
    });
  }

  public static newCertification(fb: FormBuilder, data?: ICertification): FormGroup {
    return fb.group({
      name: [data?.name, Validators.required],
      provider: [data?.provider, Validators.required],
      certificationId: [data?.certificationId, Validators.required],
      url: [data?.url],
      validFrom: [data?.validFrom, Validators.required],
      canExpire: [data?.canExpire, Validators.required],
      expiryDate: [data?.expiryDate]
    });
  }

  public static newFamilyForm(fb: FormBuilder, data?: IFamily): FormGroup {
    return fb.group({
      name: [data?.name, Validators.required],
      relationship: [data?.relationship, Validators.required]
    });
  }

  public static newlanguageForm(fb: FormBuilder, data?: ILanguage): FormGroup {
    return fb.group({
      name: [data?.name, Validators.required],
      proficiency: [data?.proficiency, Validators.required],
      read: [data?.read],
      write: [data?.read],
      speak: [data?.read]
    });
  }

  public static dateDiffVector(date1: Date, date2: Date): IDuration {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    months = months - years * 12;
    days = days - (years * 12 * 31) - (months * 31);
    return {
      years: years,
      days: days,
      months: months
    } as IDuration
  }

  public static dateDiff(date1: Date, date2: Date): string {
    const diff = this.dateDiffVector(date1, date2);

    var days = diff.days ? diff.days : 0;
    var months = diff.months ? diff.months : 0;
    var years = diff.years ? diff.years : 0;

    var message = '';
    message += (years ? years + " year" : '') + (years > 1 ? 's' : '')
    message += " " + (months ? months + " month" : '') + (months > 1 ? 's' : '')
    // message += " " + (days ? days + " day" : '') + (days > 1 ? 's' : '')

    return message
  }

  public static removeNumbers(val: string): string {
    let result = '';
    val.split('').forEach(v => result += (this.isNumber(+v) ? '' : v));
    return result.trim();
  }

  public static mask(value: string | number, masking_char: string, length: number): string {
    value = value.toString();
    if (value.length < length) {
      for (let i = 0; i < (length - value.length); i++) {
        value = masking_char + value;
      }
    }
    return value;
  }

  public static getClientInfo(): Object {
    return {
      browserCodeName: navigator.appCodeName,
      browserName: navigator.appName,
      browserVersion: navigator.appVersion,
      cookiesEnabled: navigator.cookieEnabled,
      platform: navigator.platform,
      userAgentHeader: navigator.userAgent,
      recordedOn: new Date()
    }
  }
}
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
}
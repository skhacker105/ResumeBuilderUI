import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationTypes } from 'src/app/helpers/education-type-enum';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IEducation } from 'src/app/models/education';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() educationForms: FormArray | undefined;
  educationForm: FormGroup | undefined;
  educationTypes = Object.values(EducationTypes);
  isNumber = SupportFunctions.isNumber;
  get education(): FormArray { return this.educationForm?.get('lstEducation') as FormArray; }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      lstEducation: this.educationForms
    });
  }

  educationalProjects(e: any): FormArray { return e.get('projects') as FormArray; }
  getCourse(e: any): string { return e.get('course').value }

  addEducation() {
    this.education.push(this.newEducationForm());
  }

  deleteEducation(index: number) {
    this.education.removeAt(index);
  }

  newEducationForm(data?: IEducation): FormGroup {
      return this.fb.group({
          university: [data?.university, Validators.required],
          course: [data?.course, Validators.required],
          specialization: [data?.specialization, Validators.required],
          type: [data?.type ? data?.type : EducationTypes.FullTime, Validators.required],
          startedOn: [data?.startedOn, [Validators.required]],
          endedOn: [data?.endedOn],
          marksScored: [data?.marksScored, Validators.required],
          maxPossibleScore: [data ? data.maxPossibleScore : 100, Validators.required],
          projects: this.fb.array([])
      });
  }

  submitForm() {}

}

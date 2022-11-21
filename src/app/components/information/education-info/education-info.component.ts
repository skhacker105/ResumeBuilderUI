import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EducationTypes } from 'src/app/helpers/education-type-enum';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit, OnChanges {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() educationForms: FormArray | undefined;
  educationForm: FormGroup | undefined;
  educationTypes = Object.values(EducationTypes);
  isNumber = SupportFunctions.isNumber;
  get education(): FormArray { return this.educationForm?.get('lstEducation') as FormArray; }
  
  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.educationForm = this.fb.group({
      lstEducation: this.educationForms
    });
  }

  ngOnInit(): void {
  }

  educationalProjects(e: any): FormArray { return e.get('projects') as FormArray; }
  getCourse(e: any): string { return e.get('course').value }

  addEducation() {
    this.education.push(SupportFunctions.newEducationForm(this.fb));
  }

  deleteEducation(index: number) {
    this.education.removeAt(index);
  }

  submitForm() {}

}

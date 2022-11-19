import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalTypes } from 'src/app/helpers/professional-type-enum';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IProfessional } from 'src/app/models/professional';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.scss']
})
export class ProfessionalInfoComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() professionalInfoForms: FormArray | undefined;
  professionalInfoForm: FormGroup | undefined;
  professionalTypes = Object.values(ProfessionalTypes);
  isNumber = SupportFunctions.isNumber;
  get profession(): FormArray { return this.professionalInfoForm?.get('lstProfession') as FormArray; }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.professionalInfoForm = this.fb.group({
      lstProfession: this.professionalInfoForms
    });
  }

  professionalProjects(e: any): FormArray { return e.get('projects') as FormArray; }
  getcompanyName(e: any): string { return e.get('companyName').value }

  addProfession() {
    this.profession.push(this.newProfessionalInfoForm());
  }

  deleteProfession(index: number) {
    this.profession.removeAt(index);
  }

  newProfessionalInfoForm(data?: IProfessional): FormGroup {
      return this.fb.group({
          isCurrent: [data?.isCurrent, Validators.required],
          type: [data ? data.type : ProfessionalTypes.FullTime, Validators.required],
          companyName: [data?.companyName, Validators.required],
          companyLocation: [data?.companyLocation, Validators.required],
          joiningDate: [data?.joiningDate, Validators.required],
          relievingDate: [data?.relievingDate],
          salary: [data?.salary, Validators.required],
          stipend: [data?.stipend],
          skillsUsed: [data?.skillsUsed, Validators.required],
          employeeRole: [data?.employeeRole],
          profileSummary: [data?.profileSummary],
          projects: this.fb.array([])
      });
  }

  submitForm() {}

}

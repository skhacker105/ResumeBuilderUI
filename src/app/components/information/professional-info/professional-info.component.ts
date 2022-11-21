import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalTypes } from 'src/app/helpers/professional-type-enum';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrls: ['./professional-info.component.scss']
})
export class ProfessionalInfoComponent implements OnInit, OnChanges {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() professionalInfoForms: FormArray | undefined;
  professionalInfoForm: FormGroup | undefined;
  professionalTypes = Object.values(ProfessionalTypes);
  isNumber = SupportFunctions.isNumber;
  get profession(): FormArray { return this.professionalInfoForm?.get('lstProfession') as FormArray; }
  
  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.professionalInfoForm = this.fb.group({
      lstProfession: this.professionalInfoForms
    });
  }

  ngOnInit(): void {
  }

  professionalProjects(e: any): FormArray { return e.get('projects') as FormArray; }
  getcompanyName(e: any): string { return e.get('companyName').value }

  addProfession() {
    this.profession.push(SupportFunctions.newProfessionalInfoForm(this.fb));
  }

  deleteProfession(index: number) {
    this.profession.removeAt(index);
  }

  submitForm() {}

}

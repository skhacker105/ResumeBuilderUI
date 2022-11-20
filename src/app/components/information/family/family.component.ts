import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IFamily } from 'src/app/models/family';
import { Relationships } from 'src/app/models/relation-enum';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() familyMemberForms: FormArray | undefined;
  familyMemberForm: FormGroup | undefined;
  familyTypes = Object.values(Relationships);
  isNumber = SupportFunctions.isNumber;
  get families(): FormArray { return this.familyMemberForm?.get('lstfamilyMember') as FormArray; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.familyMemberForm = this.fb.group({
      lstfamilyMember: this.familyMemberForms
    });
  }

  addFamily() {
    this.families.push(this.newFamily());
  }

  deleteFamily(index: number) {
    this.families.removeAt(index);
  }

  newFamily(data?: IFamily): FormGroup {
    return this.fb.group({
      name: [data?.name, Validators.required],
      relationship: [data?.relationship, Validators.required]
    });
  }

  submitForm() { }

}

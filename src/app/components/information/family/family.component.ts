import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { Relationships } from 'src/app/models/relation-enum';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit, OnChanges {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() familyMemberForms: FormArray | undefined;
  @Input() mobileView = false;
  familyMemberForm: FormGroup | undefined;
  familyTypes = Object.values(Relationships);
  isNumber = SupportFunctions.isNumber;
  get families(): FormArray { return this.familyMemberForm?.get('lstfamilyMember') as FormArray; }

  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.familyMemberForm = this.fb.group({
      lstfamilyMember: this.familyMemberForms
    });
  }

  ngOnInit(): void {
  }

  addFamily() {
    this.families.push(SupportFunctions.newFamilyForm(this.fb));
  }

  deleteFamily(index: number) {
    this.families.removeAt(index);
  }

  submitForm() { }

}

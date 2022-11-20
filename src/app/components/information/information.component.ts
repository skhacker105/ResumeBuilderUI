import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EducationTypes } from 'src/app/helpers/education-type-enum';
import { InfoForm } from 'src/app/helpers/info-form';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IPersonal } from 'src/app/models/personal';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent extends InfoForm implements OnInit {

  step = 0;
  user: IUser | undefined;
  rowHeight = "100px";
  isNumber = SupportFunctions.isNumber;

  constructor(private userService: UserService, fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe(user => {
      if (!user) return
      this.user = user;
      this.newInfoForm(user);
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  save() {
    let info = Object.assign({
      userId: this.user?._id,
      petProjects: this.petProjects.value,
      languages: this.languageForms.value,
      familyMembers: this.familyMembers.value,
      certifications: this.certificationForms?.value,
      education: this.educationForms.value,
      professional: this.professional.value,
      expertises: this.expertisesForm?.get('lstExpertise')?.value
    }, this.infoForm?.value) as IPersonal;
    console.log('info = ', info);
  }

}

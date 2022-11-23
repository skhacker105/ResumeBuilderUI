import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoForm } from 'src/app/helpers/info-form';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IPersonal } from 'src/app/models/personal';
import { BuilderService } from 'src/app/services/builder.service';
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
  duration = 3;
  isNumber = SupportFunctions.isNumber;

  constructor(private _snackBar: MatSnackBar, private userService: UserService, fb: FormBuilder, private builderService: BuilderService) {
    super(fb);
  }

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe(user => {
      if (!user) return
      this.user = user;
      this.loadInfo();
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

  loadInfo() {
    if (this.user)
      this.builderService.getInfo(this.user._id).subscribe(res => {
        this.user ? this.newInfoForm(this.user, res[0]) : null;
       });
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
    this.user ? this.builderService.saveInfo(this.user._id, info).subscribe(res => {
      this._snackBar.open(res.message, '', {
        duration: this.duration * 1000
      });
      this.loadInfo();
    }) : null;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EducationTypes } from 'src/app/helpers/education-type-enum';
import { InfoForm } from 'src/app/helpers/info-form';
import { SupportFunctions } from 'src/app/helpers/support-functions';
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

}

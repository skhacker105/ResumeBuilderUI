import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InfoForm } from 'src/app/helpers/info-form';
import { IPersonal } from 'src/app/models/personal';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent extends InfoForm implements OnInit {

  step = -1;
  form: IPersonal | undefined
  user: IUser | undefined;

  constructor(private userService: UserService, fb: FormBuilder) {
    super(fb)
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

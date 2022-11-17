import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { InfoForm } from 'src/app/helpers/info-form';
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
  get underNoticeControl(): FormControl { return this.infoForm?.get('noticePeriod')?.get('underNotice') as FormControl; }
  get petProjects(): FormArray { return this.infoForm?.get('petProjects') as FormArray; }
  get education(): FormArray { return this.infoForm?.get('education') as FormArray; }

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

  addPetProject() {
    this.petProjects.push(this.newProjectsForm());
    console.log('petProjects = ', this.petProjects)
  }

  deletePetProject(index: number) {
    this.petProjects.removeAt(index);
  }

  addEducation() {
    this.education.push(this.newEducationForm());
  }

  deleteEducation(index: number) {
    this.education.removeAt(index);
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

  submitForm() { }

}

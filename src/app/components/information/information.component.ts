import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { InfoForm } from 'src/app/helpers/info-form';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IPersonal } from 'src/app/models/personal';
import { BuilderService } from 'src/app/services/builder.service';
import { PreviewService } from 'src/app/services/preview.service';
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
  isActive = new Subject();
  profilePicture: FormGroup | undefined;
  isNumber = SupportFunctions.isNumber;
  picture: string | undefined;

  constructor(private _snackBar: MatSnackBar, private userService: UserService, fb: FormBuilder,
    private builderService: BuilderService, public previewService: PreviewService) {
    super(fb);
  }

  ngOnInit(): void {
    this.profilePicture = this.fb.group({
      profile: [undefined]
    });
    this.userService.loggedInUser
      .pipe(takeUntil(this.isActive))
      .subscribe(user => {
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
      this.builderService.getInfo(this.user._id)
        .pipe(takeUntil(this.isActive))
        .subscribe(res => {
          this.user ? this.newInfoForm(this.user, res[0]) : null;
          this.loadImage();
        });
  }

  loadImage() {
    if (!this.user) return;
    this.builderService.loadImage(this.user._id)
    .pipe(takeUntil(this.isActive))
    .subscribe({
      next: (res) => {
        this.picture = res.image
      },
      error: (err) => {}
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
    this.user ? this.builderService.saveInfo(this.user._id, info)
    .pipe(takeUntil(this.isActive))
    .subscribe(res => {
      this._snackBar.open(res.message, '', {
        duration: this.duration * 1000
      });
      this.loadInfo();
    }) : null;
    this.profilePicture?.reset();
  }

  processFile() {
    if (!this.profilePicture) return;
    const file: File = this.profilePicture.get('profile')?.value;
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      if (!this.user) return;
      this.builderService.uploadImage(this.user._id, event.target.result)
      .pipe(takeUntil(this.isActive))
      .subscribe({
        next: (res) => {
          this.picture = event.target.result
          this._snackBar.open(res.message, '', {
            duration: this.duration * 1000
          });
          this.profilePicture?.reset();
        },
        error: (err) => {
          this._snackBar.open(err.error, '', {
            duration: this.duration * 1000
          });
          this.profilePicture?.reset();
        }
      });
    });

    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.isActive.next(false);
    this.isActive.complete();
  }

}

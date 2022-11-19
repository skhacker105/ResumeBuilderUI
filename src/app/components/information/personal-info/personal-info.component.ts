import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() infoForm: FormGroup | undefined;
  
  get underNoticeControl(): FormControl { return this.infoForm?.get('noticePeriod')?.get('underNotice') as FormControl; }

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submitForm() { }

}

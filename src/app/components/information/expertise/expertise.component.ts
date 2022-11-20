import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() expertisesForm: FormGroup | undefined;
  get expertise(): string[] { return this.expertisesForm?.get('lstExpertise')?.value; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addExpertise(event: MatChipInputEvent) {
    const exp = (event.value || '').trim();
    if (exp) this.expertise.push(exp);
    event.chipInput!.clear();
    console.log('expertise = ', this.expertise);
  }

  deleteExpertise(exp: string) {
    const index = this.expertise.indexOf(exp);
    this.expertise.splice(index, 1);
    console.log('expertise = ', this.expertise);
  }

  submitForm() {}

}

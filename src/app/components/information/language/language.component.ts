import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProficiencyTypes } from 'src/app/helpers/proficiency-types.enum';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { ILanguage } from 'src/app/models/language';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() languageForms: FormArray | undefined;
  languageForm: FormGroup | undefined;
  proficiencyTypes = Object.values(ProficiencyTypes);
  isNumber = SupportFunctions.isNumber;
  get language(): FormArray { return this.languageForm?.get('lstLanguage') as FormArray; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.languageForm = this.fb.group({
      lstLanguage: this.languageForms
    });
  }

  // educationalProjects(e: any): FormArray { return e.get('projects') as FormArray; }
  // getCourse(e: any): string { return e.get('course').value }

  addLanguage() {
    this.language.push(this.newlanguageForm());
  }

  deleteLanguage(index: number) {
    this.language.removeAt(index);
  }

  newlanguageForm(data?: ILanguage): FormGroup {
    return this.fb.group({
      name: [data?.name, Validators.required],
      proficiency: [data?.proficiency, Validators.required],
      read: [data?.read],
      write: [data?.read],
      speak: [data?.read]
    });
  }

  submitForm() { }

}

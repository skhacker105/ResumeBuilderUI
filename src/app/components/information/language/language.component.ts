import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProficiencyTypes } from 'src/app/helpers/proficiency-types.enum';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit, OnChanges {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() languageForms: FormArray | undefined;
  @Input() mobileView = false;
  languageForm: FormGroup | undefined;
  proficiencyTypes = Object.values(ProficiencyTypes);
  isNumber = SupportFunctions.isNumber;
  get language(): FormArray { return this.languageForm?.get('lstLanguage') as FormArray; }

  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.languageForm = this.fb.group({
      lstLanguage: this.languageForms
    });
  }

  ngOnInit(): void {
  }

  // educationalProjects(e: any): FormArray { return e.get('projects') as FormArray; }
  // getCourse(e: any): string { return e.get('course').value }

  addLanguage() {
    this.language.push(SupportFunctions.newlanguageForm(this.fb));
  }

  deleteLanguage(index: number) {
    this.language.removeAt(index);
  }

  submitForm() { }

}

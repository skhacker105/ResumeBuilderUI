import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SupportFunctions } from 'src/app/helpers/support-functions';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit, OnChanges {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() certificationForms: FormArray | undefined;
  certificationForm: FormGroup | undefined;
  get certification(): FormArray { return this.certificationForm?.get('lstCertification') as FormArray; }

  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.certificationForm = this.fb.group({
      lstCertification: this.certificationForms
    });
  }

  ngOnInit(): void {
  }

  canExpireControl(e: any): FormControl { return e.get('canExpire') as FormControl; }
  getCertification(e: any): string { return e.get('name').value }

  addCertification() {
    this.certification.push(SupportFunctions.newCertification(this.fb));
  }

  deleteCertification(index: number) {
    this.certification.removeAt(index);
  }

  submitForm() { }
}

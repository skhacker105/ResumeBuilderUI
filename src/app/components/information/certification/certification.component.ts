import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICertification } from 'src/app/models/certifications';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() certificationForms: FormArray | undefined;
  certificationForm: FormGroup | undefined;
  get certification(): FormArray { return this.certificationForm?.get('lstCertification') as FormArray; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.certificationForm = this.fb.group({
      lstCertification: this.certificationForms
    });
  }

  canExpireControl(e: any): FormControl { return e.get('canExpire') as FormControl; }
  getCertification(e: any): string { return e.get('name').value }

  addCertification() {
    this.certification.push(this.newCertification());
  }

  deleteCertification(index: number) {
    this.certification.removeAt(index);
  }

  newCertification(data?: ICertification): FormGroup {
    return this.fb.group({
      name: [data?.name, Validators.required],
      provider: [data?.provider, Validators.required],
      certificationId: [data?.certificationId, Validators.required],
      url: [data?.url],
      validFrom: [data?.validFrom, Validators.required],
      canExpire: [data?.canExpire, Validators.required],
      expiryDate: [data?.expiryDate]
    });
  }

  submitForm() { }
}

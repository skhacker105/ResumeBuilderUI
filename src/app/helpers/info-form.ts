import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ICertification } from "../models/certifications";
import { IFamily } from "../models/family";
import { ILanguage } from "../models/language";
import { IUser } from "../models/user";
import { ProficiencyTypes } from "./proficiency-types.enum";

export class InfoForm {
    infoForm: FormGroup | undefined;
    petProjects: FormArray;
    educationForms: FormArray;
    professional: FormArray;

    constructor(public fb: FormBuilder) {
        this.petProjects = fb.array([]);
        this.educationForms = fb.array([]);
        this.professional = fb.array([]);
    }

    newInfoForm(user: IUser) {
        this.infoForm = this.fb.group({
            fname: [user.firstName, Validators.required],
            lname: [user.lastName, Validators.required],
            jobStartDate: [null, Validators.required],
            salary: ['', Validators.required],
            currentAddress: this.newAddressForm(),
            permanentAddress: this.newAddressForm(),
            noticePeriod: this.newNoticePeriod(),
            resumeHeadLine: ['', Validators.required]
            // languages: this.fb.array([], Validators.required), // pending
            // familyMembers: this.fb.array([]), // pending
            // certifications: this.fb.array([]), // pending
            // expertise: [[]] // pending
        });
    }

    newAddressForm(): FormGroup {
        return this.fb.group({
            street: ['', Validators.required],
            locality: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            contactNumber: ['', ],
            email: ['', Validators.required]
        });
    }
  
    newNoticePeriod(): FormGroup {
        return this.fb.group({
            underNotice: [false, Validators.required],
            resignationDate: [null],
            noticeEndDate: [null]
        });
    }

    newCertificationForm(data?: ICertification): FormGroup {
        return this.fb.group({
            name: [data?.name, Validators.required],
            provider: [data?.provider, Validators.required],
            certificationId: [data?.certificationId, Validators.required],
            url: [data?.url],
            validFrom: [data?.validFrom, Validators.required],
            canExpire: [data?.canExpire, Validators.required],
            expiryDate: [data?.expiryDate, Validators.required]
        });
    }

    newFamilyForm(data?: IFamily): FormGroup {
        return this.fb.group({
            name: [data?.name, Validators.required],
            relationship: [data?.relationship, Validators.required]
        });
    }

    newLanguageForm(data?: ILanguage): FormGroup {
        return this.fb.group({
            name: [data?.name, Validators.required],
            proficiency: [data ? data.proficiency : ProficiencyTypes.Beginner, Validators.required],
            read: [data?.read],
            write: [data?.write],
            speak: [data?.speak]
        });
    }
}
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { IResidentialAddress } from "../models/address";
import { ICertification } from "../models/certifications";
import { IFamily } from "../models/family";
import { ILanguage } from "../models/language";
import { INoticePeriod } from "../models/notice-period";
import { IPersonal } from "../models/personal";
import { IUser } from "../models/user";
import { ProficiencyTypes } from "./proficiency-types.enum";
import { SupportFunctions } from "./support-functions";

export class InfoForm {
    formData: IPersonal | undefined;

    infoForm: FormGroup | undefined;
    petProjects: FormArray;
    educationForms: FormArray;
    professional: FormArray;
    expertisesForm: FormGroup | undefined;
    certificationForms: FormArray | undefined;
    familyMembers: FormArray;
    languageForms: FormArray;

    constructor(public fb: FormBuilder) {
        this.petProjects = fb.array([]);
        this.educationForms = fb.array([]);
        this.professional = fb.array([]);
        this.certificationForms = fb.array([]);
        this.familyMembers = fb.array([]);
        this.languageForms = fb.array([]);
        this.expertisesForm = this.newExpertiseForm();
    }

    newInfoForm(user: IUser, info?: IPersonal) {
        this.formData = info;
        this.infoForm = this.fb.group({
            fname: [info ? info.fname : user.firstName, Validators.required],
            lname: [info ? info.lname : user.lastName, Validators.required],
            jobStartDate: [info ? info.jobStartDate : null, Validators.required],
            salary: [info ? info.salary : '', Validators.required],
            currentAddress: this.newAddressForm(info?.currentAddress),
            permanentAddress: this.newAddressForm(info?.permanentAddress),
            noticePeriod: this.newNoticePeriod(info?.noticePeriod),
            resumeHeadLine: [info ? info.resumeHeadLine : '', Validators.required]
        });
        info ? this.renewForms() : null;
    }

    renewForms() {
        this.petProjects = SupportFunctions.generateProjectForm(this.fb, this.formData?.petProjects);
        this.educationForms = this.renewEducationForms();
        this.professional = this.renewProfessionalForms();
        this.certificationForms = this.renewCertificationForms();
        this.familyMembers = this.renewFamilyForms();
        this.languageForms = this.renewLanguageForms();
        this.expertisesForm = this.newExpertiseForm(this.formData?.expertises);
    }

    renewEducationForms(): FormArray {
        if (this.formData && this.formData.education && this.formData.education.length > 0) {
            return this.fb.array(this.formData.education.map(e => {
                return SupportFunctions.newEducationForm(this.fb, e);
            }));
        }
        return this.educationForms;
    }

    renewProfessionalForms(): FormArray {
        if (this.formData && this.formData.professional && this.formData.professional.length > 0) {
            return this.fb.array(this.formData.professional.map(p => {
                return SupportFunctions.newProfessionalInfoForm(this.fb, p)
            }))
        }
        return this.professional;
    }

    renewCertificationForms(): FormArray | undefined {
        if (this.formData && this.formData.certifications && this.formData.certifications.length > 0) {
            return this.fb.array(this.formData.certifications.map(c => {
                return SupportFunctions.newCertification(this.fb, c);
            }));
        }
        return this.certificationForms;
    }

    renewFamilyForms(): FormArray {
        if (this.formData && this.formData.familyMembers && this.formData.familyMembers.length > 0) {
            return this.fb.array(this.formData.familyMembers.map(f => {
                return SupportFunctions.newFamilyForm(this.fb, f);
            }));
        }
        return this.familyMembers;
    }

    renewLanguageForms(): FormArray {
        if (this.formData && this.formData.languages && this.formData.languages.length > 0) {
            return this.fb.array(this.formData.languages.map(l => {
                return SupportFunctions.newlanguageForm(this.fb, l);
            }));
        }
        return this.professional;
    }

    newExpertiseForm(exp?: string[]): FormGroup {
        return this.fb.group({
            lstExpertise: [exp ? exp : []]
        });
    }

    newAddressForm(addr?: IResidentialAddress): FormGroup {
        return this.fb.group({
            street: [addr ? addr.street : '', Validators.required],
            locality: [addr ? addr.locality : ''],
            city: [addr ? addr.city : '', Validators.required],
            state: [addr ? addr.state : '', Validators.required],
            country: [addr ? addr.country : '', Validators.required],
            contactNumber: [addr ? addr.contactNumber : ''],
            email: [addr ? addr.email : '', Validators.required]
        });
    }

    newNoticePeriod(notice?: INoticePeriod): FormGroup {
        return this.fb.group({
            underNotice: [notice ? notice.underNotice : false, Validators.required],
            resignationDate: [notice ? notice.resignationDate : null],
            noticeEndDate: [notice ? notice.noticeEndDate : null]
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
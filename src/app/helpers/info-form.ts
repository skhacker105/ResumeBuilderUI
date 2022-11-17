import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { IPhoneAddress } from "../models/address";
import { ICertification } from "../models/certifications";
import { IFamily } from "../models/family";
import { ILanguage } from "../models/language";
import { IProfessional } from "../models/professional";
import { IProjects } from "../models/projects";
import { IUser } from "../models/user";
import { EducationTypes } from "./education-type-enum";
import { ProfessionalTypes } from "./professional-type-enum";
import { ProficiencyTypes } from "./proficiency-types.enum";

export class InfoForm {
    infoForm: FormGroup | undefined;

    constructor(private fb: FormBuilder) { }

    newInfoForm(user: IUser) {
        this.infoForm = this.fb.group({
            fname: [user.firstName, Validators.required],
            lname: [user.lastName, Validators.required],
            jobStartDate: [new Date(), Validators.required],
            salary: ['', Validators.required],
            currentAddress: this.newAddressForm(),
            permanentAddress: this.newAddressForm(),
            noticePeriod: this.newNoticePeriod(),
            resumeHeadLine: ['', Validators.required],
            petProjects: this.fb.array([], [Validators.required]),
            languages: this.fb.array([], [Validators.required]),
            familyMembers: this.fb.array([]),
            certifications: this.fb.array([]),
            education: this.fb.array([]),
            professional: this.fb.array([]),

        });
    }

    newProfessionalInfoForm(data?: IProfessional): FormGroup {
        return this.fb.group({
            isCurrent: [data?.isCurrent, Validators.required],
            type: [data ? data.type : ProfessionalTypes.FullTime, Validators.required],
            companyName: [data?.companyName, Validators.required],
            companyLocation: [data?.companyLocation, Validators.required],
            joiningDate: [data?.joiningDate, Validators.required],
            relievingDate: [data?.relievingDate],
            salary: [data?.salary, Validators.required],
            stipend: [data?.stipend],
            skillsUsed: [data?.skillsUsed, Validators.required],
            employeeRole: [data?.employeeRole],
            profileSummary: [data?.profileSummary],
            projects: this.fb.array([])
        });
    }

    newEducationForm(): FormGroup {
        return this.fb.group({
            university: ['', Validators.required],
            course: ['', Validators.required],
            specialization: ['', Validators.required],
            type: [EducationTypes.FullTime, Validators.required],
            startedOn: this.newDurationForm(),
            endedOn: this.newDurationForm(),
            marksScored: [0, Validators.required],
            maxPossibleScore: [100, Validators.required],
            projects: this.fb.array([])
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

    newProjectsForm(data?: IProjects): FormGroup {
        return this.fb.group({
            title: [data?.title, Validators.required],
            projectDuration: data?.projectDuration,
            myContributions: [data?.myContributions, Validators.required],
            projectDetails: [data?.projectDetails, Validators.required],
            githubLink: [data?.githubLink]
        });
    }

    newNoticePeriod(): FormGroup {
        return this.fb.group({
            underNotice: [false, Validators.required],
            resignationDate: [null],
            noticeEndDate: [null],
            noticePeriod: this.newDurationForm()
        });
    }

    newDurationForm(): FormGroup {
        return this.fb.group({
            years: [0],
            months: [0],
            days: [0],
            hours: [0],
            minutes: [0],
            seconds: [0],
            milliseconds: [0]
        });
    }

    newAddressForm(): FormGroup {
        return this.fb.group({
            street: ['', Validators.required],
            locality: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', , Validators.required],
            contactNumber: this.fb.array([], [Validators.required]),
            email: ['', , Validators.required]
        });
    }

    newPhoneAddressForm(data?: IPhoneAddress): FormGroup {
        return this.fb.group({
            countryCode: [data?.countryCode, Validators.required],
            phone: [data?.phone, Validators.required]
        });
    }
}
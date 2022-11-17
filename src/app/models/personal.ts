import { IResidentialAddress } from "./address";
import { ICertification } from "./certifications";
import { IEducation } from "./education";
import { IFamily } from "./family";
import { ILanguage } from "./language";
import { INoticePeriod } from "./notice-period";
import { IProfessional } from "./professional";
import { IProjects } from "./projects";
import { IUser } from "./user";

export interface IPersonal {
    user: IUser,
    jobStartDate: Date,
    salary: number,
    currentAddress: IResidentialAddress,
    permanentAddress: IResidentialAddress,
    noticePeriod: INoticePeriod,
    resumeHeadLine: string,
    petProjects?: IProjects[],
    languages?: ILanguage[],
    familyMembers: IFamily,
    certifications: ICertification,
    education: IEducation,
    professional: IProfessional[],
    expertise: string[]
}
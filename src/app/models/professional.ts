import { ProfessionalTypes } from "../helpers/professional-type-enum";
import { IProjects } from "./projects";

export interface IProfessional {
    isCurrent: boolean,
    type: ProfessionalTypes,
    companyName: string,
    companyLocation: string,
    joiningDate: Date,
    relievingDate?: Date,
    salary: number,
    stipend?: number,
    skillsUsed: string,
    employeeRole?: string,
    profileSummary?: string,
    projects: IProjects[]
}
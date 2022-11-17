import { IDuration } from "./duration";
import { EducationTypes } from "../helpers/education-type-enum";
import { IProjects } from "./projects";

export interface IEducation {
    university: string,
    course: string,
    specialization: string,
    type: EducationTypes,
    startedOn: IDuration,
    endedOn: IDuration,
    marksScored: number,
    maxPossibleScore: number,
    projects?: IProjects[]
}
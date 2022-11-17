import { IDuration } from "./duration";
import { EducationTypes } from "../helpers/education-type-enum";
import { IProjects } from "./projects";

export interface IEducation {
    university: string,
    course: string,
    specialization: string,
    type: EducationTypes,
    startedOn: Date,
    endedOn?: Date,
    marksScored: number,
    maxPossibleScore: number,
    projects?: IProjects[]
}
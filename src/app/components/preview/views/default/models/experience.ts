import { IProjects } from "src/app/models/projects";

export interface IExperience {
    company: string;
    dates: string;
    duration: string;
    role: string;
    package: string;
    projects: IProjects[];
}
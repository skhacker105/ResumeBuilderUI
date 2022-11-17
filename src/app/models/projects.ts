import { IDuration } from "./duration";

export interface IProjects {
    title: string,
    projectDuration: IDuration,
    myContributions: string,
    projectDetails: string,
    githubLink?: string
}
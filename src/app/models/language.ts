import { ProficiencyTypes } from "../helpers/proficiency-types.enum";

export interface ILanguage {
    name: string,
    proficiency: ProficiencyTypes,
    read: boolean,
    write: boolean,
    speak: boolean
}
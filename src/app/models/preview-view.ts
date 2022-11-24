import { IPersonal } from "./personal";

export interface IPreviewView {
    info: IPersonal | undefined;
}

export interface IPreview {
    type: string, view: IPreviewView, name: string
}
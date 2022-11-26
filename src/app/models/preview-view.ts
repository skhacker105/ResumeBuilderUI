import { IPersonal } from "./personal";

export interface IPreviewView {
    pic: string | undefined;
    info: IPersonal | undefined;
}

export interface IPreview {
    type: string, view: IPreviewView, name: string, image: string
}
import { IDuration } from "./duration";

export interface INoticePeriod {
    underNotice: boolean,
    resignationDate?: Date,
    noticeEndDate?: Date,
    noticePeriod?: IDuration
}
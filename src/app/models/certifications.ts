export interface ICertification {
    name: string,
    provider: string,
    certificationId: string,
    url?: string,
    validFrom: Date,
    canExpire: boolean,
    expiryDate?: Date
}
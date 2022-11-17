export interface IResidentialAddress {
    street: string,
    locality?: string,
    city: string,
    state: string,
    country: string,
    contactNumber: IPhoneAddress[],
    email: string
}

export interface IPhoneAddress {
    countryCode: number,
    phone: number
}
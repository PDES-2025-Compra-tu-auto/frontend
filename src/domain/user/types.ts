export enum UserRole {
    ADMINISTRATOR = 'ADMINISTRATOR',
    BUYER = 'BUYER',
    CONCESIONARY = 'CONCESIONARY'
}
export interface UserProfile {
    id?:string,
    fullname:string,
    email: string ,
    role: UserRole
}

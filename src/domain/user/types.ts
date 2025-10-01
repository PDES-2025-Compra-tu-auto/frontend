export enum UserRole {
    ADMINISTRATOR = 'ADMINISTRATOR',
    BUYER = 'BUYER',
    CONCESIONARY = 'CONCESIONARY'
}
export interface UserProfile {
    fullname:string,
    email: string ,
    role: UserRole
}

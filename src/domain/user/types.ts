export enum UserRole {
    ADMINISTRATOR = 'ADMINISTRATOR',
    BUYER = 'BUYER',
    DEALER = 'DEALER'
}
export interface UserProfile {
    fullName:string,
    email: string ,
    role: UserRole
}
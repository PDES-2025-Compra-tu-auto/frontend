import { UserRole } from "@/domain/user/types"

export const tokens={
  ADMINISTRATOR:{
    accessToken:"admin-access-token-mock",
  },
  CONCESIONARY:{
    accessToken:"concesionary-access-token-mock",
  },
  BUYER:{
    accessToken:"buyer-access-token-mock",
  }

}

export const roleByUser=(email:string):UserRole=>{
    if(email.includes('admin')) return UserRole.ADMINISTRATOR
    if(email.includes('buyer')) return UserRole.BUYER
    if(email.includes('concesionary')) return UserRole.CONCESIONARY
    return UserRole.BUYER
}


export const matchRoleToken=(token:string)=>{
 switch (token) {
    case 'Bearer buyer-access-token-mock':
      return "BUYER";
    case 'Bearer concesionary-access-token-mock':
      return "CONCESIONARY";
    case 'Bearer admin-access-token-mock':
      return "ADMINISTRATOR";
    default:
        return "BUYER"
    }

};
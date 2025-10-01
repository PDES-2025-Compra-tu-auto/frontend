import type { UserRole } from "@/domain/user/types";

export interface LoginResponse {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
  email: string;
  fullname: string;
  role: UserRole;
}

export interface ValidateResponse {
  role: UserRole;
  fullname: string;
  email: string;
  valid: boolean;
  id: string;
}

export interface RefreshResponse {
  accessToken: string;
  expiresAt: string;
}

export interface RegisterCredentials { 
  fullname:string;
  email: string;
  password:string;
  role: UserRole;
  concesionaryName?:string; 
  concesionaryCuit?:string;

}

export interface RegisterResponse {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

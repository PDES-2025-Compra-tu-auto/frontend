import type { UserRole } from "@/domain/user/types";

export interface UserDashboardDto {
  id: string;
  
  title: string;
  
  description: string;
}

export interface UserResponseDto {
  id: number;

  fullname: string;

  email: string;

  role: UserRole;

  createdAt: Date;
}

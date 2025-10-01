import type { UserRole } from "@/domain/user/types";
import { tokens } from "../utils";



export const registerResponse = ({
  role,
  email,
}: {
  role: string;
  email: string;
}) => {
  return {
    id: "01a52bb2-993b-435c-b41f-5123340a8d8c",
    email: email,
    role: role,
    createdAt: "2025-09-10T23:08:44.204Z",
  };
};
export const loginResponseJson=(role:UserRole) =>( {
  accessToken: tokens[role].accessToken,
  expiresAt: 1757551472,
  role: role,
  email: `${role.toLowerCase()}@gmail.com`,
  fullname: `Diego ${role.toLowerCase()}`,
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMWE1MmJiMi05OTNiLTQzNWMtYjQxZi01MTIzMzQwYThkOGMiLCJyb2xlIjoiQlVZRVIiLCJpYXQiOjE3NTc1NDc4NzIsImV4cCI6MTc1NzU2OTQ3Mn0.pUd78xuSkOhtUeOph_3_yzVgEMap2E26iEGl9QIz7l8",
});
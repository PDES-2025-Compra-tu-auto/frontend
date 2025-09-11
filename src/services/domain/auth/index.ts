import type { LoginCredentials } from "@/pages/Login/validations";
import {  fetchJson } from "@/utils/fetch/httpService";
import { BACKEND_API } from "../constants";
import type { LoginResponse } from "./types";




export const loginCTA = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetchJson<LoginResponse>({
    url: `${BACKEND_API}/auth/login`,
    method: 'POST',
    data: credentials,
    withCredentials: false,
  });

  return response;
};

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

export const registerCTA = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetchJson<LoginResponse>({
    url: `${BACKEND_API}/auth/register`,
    method: 'POST',
    data: credentials,
    withCredentials: false,
  });

  return response;
};


export const validateCTA = async (accessToken:string): Promise<{valid:boolean}> => {
  const response = await fetchJson<{valid:boolean}>({
    url: `${BACKEND_API}/auth/validate`,
    method: 'POST',
    accessToken,
    withCredentials: false,
  });
  return response;
};

export const refreshCTA = async (refresh:{token:string}): Promise<{access_token:string}> => {
  const response = await fetchJson<{access_token:string}>({
    url: `${BACKEND_API}/auth/refresh`,
    method: 'POST',
    data:refresh,
    withCredentials: false,
  });

  return response;
};

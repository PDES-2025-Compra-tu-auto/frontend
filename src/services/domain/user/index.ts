import { fetchJson } from "@/utils/fetch/httpService";
import { BACKEND_API } from "../constants";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import type { UserDashboardDto, UserResponseDto } from "./types";

export const profileCTA = (
  id?: string
): FetchServiceEndpoint<UserDashboardDto[]> => {
  return {
    keys: ["profile", id],
    fetcher: (options) =>
      fetchJson<UserDashboardDto[]>({
        url: `${BACKEND_API}/users/profile`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const myUser = (id?: string): FetchServiceEndpoint<UserResponseDto> => {
  return {
    keys: ["user", id],
    fetcher: (options) =>
      fetchJson<UserResponseDto>({
        url: `${BACKEND_API}/users/me`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const updateUser = (
  id?: string
): FetchServiceEndpoint<{
  message: string;
}> => {
  return {
    keys: ["update", "user", id],
    fetcher: (options) =>
      fetchJson<{
        message: string;
      }>({
        url: `${BACKEND_API}/user`,
        method: "PATCH",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

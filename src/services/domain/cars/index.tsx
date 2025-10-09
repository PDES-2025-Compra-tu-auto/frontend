import { fetchJson } from "@/utils/fetch/httpService";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import { BACKEND_API } from "../constants";
import type { SaleCarResponse } from "./types";

export const getSaleCars = (): FetchServiceEndpoint<SaleCarResponse[]> => {
  return {
    keys: ["cars"],
    fetcher: (options) =>
      fetchJson<SaleCarResponse[]>({
        url: `${BACKEND_API}/sale-car`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};


export const getSaleCar = (id:string): FetchServiceEndpoint<SaleCarResponse> => {
  return {
    keys: ["car", id],
    fetcher: (options) =>
      fetchJson<SaleCarResponse>({
        url: `${BACKEND_API}/sale-car/${id}`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const updateSaleCar = (id:string,data:any): FetchServiceEndpoint<any> => {
  return {
    keys: ["car", id],
    fetcher: (options) =>
      fetchJson<any>({
        url: `${BACKEND_API}/sale-car/${id}`,
        method: "PATCH",
        withCredentials: false,
        data,
        ...options,
      }).then((res) => res),
  };
};

export const createSaleCar = (data:any): FetchServiceEndpoint<any> => {
  return {
    keys: [],
    fetcher: (options) =>
      fetchJson<any>({
        url: `${BACKEND_API}/sale-car/`,
        method: "POST",
        withCredentials: false,
        data,
        ...options,
      }).then((res) => res),
  };
};


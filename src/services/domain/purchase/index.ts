import { fetchJson } from "@/utils/fetch/httpService";
import { BACKEND_API } from "../constants";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";

export const buyCar = (saleCarId:string): FetchServiceEndpoint<any> => {
  return {
    keys: ['purchase', saleCarId],
    fetcher: (options) =>
        fetchJson<any>({
            url: `${BACKEND_API}/purchases/${saleCarId}`,
            method: "POST",
            withCredentials: false,
            ...options,
        }).then((res) => res),
  };
}

export const reviewByModelCar = (): FetchServiceEndpoint<any[]> => {
  return {
    keys: ['dealership-sales'],
    fetcher: (options) =>
      fetchJson<any[]>({
        url: `${BACKEND_API}/purchases/dealership-sales`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};
import { fetchJson } from "@/utils/fetch/httpService";
import { BACKEND_API } from "../constants";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import type { PurchaseResponse } from "./types";
import type { UserResponseDto } from "../user/types";

export const buyCar = (saleCarId:string): FetchServiceEndpoint<PurchaseResponse> => {
  return {
    keys: ['purchase', saleCarId],
    fetcher: (options) =>
        fetchJson<PurchaseResponse>({
            url: `${BACKEND_API}/purchases/${saleCarId}`,
            method: "POST",
            withCredentials: false,
            ...options,
        }).then((res) => res),
  };
}

export const concesionarySales = (): FetchServiceEndpoint<PurchaseResponse[]> => {
  return {
    keys: ['dealership-sales'],
    fetcher: (options) =>
      fetchJson<PurchaseResponse[]>({
        url: `${BACKEND_API}/purchases/dealership-sales`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const buyerPurchases = (): FetchServiceEndpoint<PurchaseResponse[]> => {
  return {
    keys: ['buyer-purchases'],
    fetcher: (options) =>
      fetchJson<PurchaseResponse[]>({
        url: `${BACKEND_API}/purchases/my-purchases`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const buyerConcesionaryClients = (): FetchServiceEndpoint<UserResponseDto[]> => {
  return {
    keys: ['buyer-clients'],
    fetcher: (options) =>
      fetchJson<UserResponseDto[]>({
        url: `${BACKEND_API}/purchases/my-clients`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};
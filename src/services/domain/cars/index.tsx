import { fetchJson } from "@/utils/fetch/httpService";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import { BACKEND_API } from "../constants";
import type { AvailabilityCar, ModelCar, SaleCarResponse } from "./types";

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

export const updateSaleCar = (id:string,data:{price:number,status:AvailabilityCar}): FetchServiceEndpoint<SaleCarResponse> => {
  return {
    keys: ["car", id],
    fetcher: (options) =>
      fetchJson<SaleCarResponse>({
        url: `${BACKEND_API}/sale-car/${id}`,
        method: "PATCH",
        withCredentials: false,
        data,
        ...options,
      }).then((res) => res),
  };
};

export const createSaleCar = (data:{price:number,modelCarId:string}): FetchServiceEndpoint<SaleCarResponse> => {
  return {
    keys: [],
    fetcher: (options) =>
      fetchJson<SaleCarResponse>({
        url: `${BACKEND_API}/sale-car/`,
        method: "POST",
        withCredentials: false,
        data,
        ...options,
      }).then((res) => res),
  };
}
  export const getModelCars = (): FetchServiceEndpoint<ModelCar[]> => {
  return {
    keys: ["model-cars"],
    fetcher: (options) =>
      fetchJson<ModelCar[]>({
        url: `${BACKEND_API}/model-cars`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };

};


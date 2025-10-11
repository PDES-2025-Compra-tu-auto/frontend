import { BACKEND_API } from "../constants";
import { fetchJson } from "@/utils/fetch/httpService";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import type { AddReview, ReviewResponse } from "./types";


export const reviewByModelCar = (id:string): FetchServiceEndpoint<ReviewResponse[]> => {
  return {
    keys: ['reviews','model',id],
    fetcher: (options) =>
      fetchJson<ReviewResponse[]>({
        url: `${BACKEND_API}/reviews/model/${id}`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const addReviewToModelCar = (data:AddReview): FetchServiceEndpoint<ReviewResponse> => {
  return {
    keys: [],
    fetcher: (options) =>
        fetchJson<ReviewResponse>({
            url: `${BACKEND_API}/reviews`,
            method: "POST",
            data,
            withCredentials: false,
            ...options,
        }).then((res) => res),
  };
}

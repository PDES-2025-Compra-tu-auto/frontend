import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import { BACKEND_API } from "../constants";
import { fetchJson } from "@/utils/fetch/httpService";
import type { FavoriteResponse } from "./types";

export const addSaleCarToFavourite = (data:{saleCarId:string}): FetchServiceEndpoint<FavoriteResponse> => {
  return {
    keys: [],
    fetcher: (options) =>
      fetchJson<FavoriteResponse>({
        url: `${BACKEND_API}/favorite-car`,
        method: "POST",
        withCredentials: false,
        data,
        ...options,
      }).then((res) => res),
  };
};

export const deleteFavourite = (favouriteId:string):FetchServiceEndpoint<{message:string}>=>{
 return {
    keys: [],
    fetcher: (options) =>
      fetchJson<{message:string}>({
        url: `${BACKEND_API}/favorite-car/${favouriteId}`,
        method: "DELETE",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
}


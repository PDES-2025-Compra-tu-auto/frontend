import { fetchJson } from "@/utils/fetch/httpService";
import type { FetchServiceEndpoint } from "@/utils/fetch/types";
import { BACKEND_API } from "../constants";
import type { BuyerStats, CarReviewStats, CarSalesStats, ConcesionaryStats } from "./types";
import type { UserRole } from "@/domain/user/types";
import type { FavoriteResponse } from "../favourites/types";
import type { UserResponseDto } from "../user/types";
import type { ReviewResponse } from "../reviews/types";
import type { PurchaseResponse } from "../purchase/types";

export const topSoldCars = (): FetchServiceEndpoint<CarSalesStats[]> => {
  return {
    keys: ["admin","top-sold"],
    fetcher: (options) =>
      fetchJson<CarSalesStats[]>({
        url: `${BACKEND_API}/admin/reports/top-sold-cars`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const topBuyers = (): FetchServiceEndpoint<BuyerStats[]> => {
  return {
    keys: ["admin","top-buyers"],
    fetcher: (options) =>
      fetchJson<BuyerStats[]>({
        url: `${BACKEND_API}/admin/reports/top-buyers`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const topRatedCars = (): FetchServiceEndpoint<CarReviewStats[]> => {
  return {
    keys: ["admin","top-rated-cars"],
    fetcher: (options) =>
      fetchJson<CarReviewStats[]>({
        url: `${BACKEND_API}/admin/reports/top-rated-cars`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
};

export const topConcesionaries = (): FetchServiceEndpoint<ConcesionaryStats[]> => {
  return {
    keys: ["admin","top-concesionaries"],
    fetcher: (options) =>
      fetchJson<ConcesionaryStats[]>({
        url: `${BACKEND_API}/admin/reports/top-agencies`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
}



export const allPurchases = (): FetchServiceEndpoint<PurchaseResponse[]> => {
  return {
    keys: ["admin","purchases"],
    fetcher: (options) =>
      fetchJson<PurchaseResponse[]>({
        url: `${BACKEND_API}/admin/purchases`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
}

export const allReviews = (): FetchServiceEndpoint<ReviewResponse[]> => {
  return {
    keys: ["admin","reviews"],
    fetcher: (options) =>
      fetchJson<ReviewResponse[]>({
        url: `${BACKEND_API}/admin/reviews`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
}

export const allFavourites = (): FetchServiceEndpoint<FavoriteResponse[]> => {
  return {
    keys: ["admin","favourites"],
    fetcher: (options) =>
      fetchJson<FavoriteResponse[]>({
        url: `${BACKEND_API}/admin/favorites`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
}


export const allUsers = (typeUser:UserRole): FetchServiceEndpoint<UserResponseDto[]> => {
  return {
    keys: ["admin","users",typeUser],
    fetcher: (options) =>
      fetchJson<UserResponseDto[]>({
        url: `${BACKEND_API}/admin/users?role=${typeUser}`,
        method: "GET",
        withCredentials: false,
        ...options,
      }).then((res) => res),
  };
}


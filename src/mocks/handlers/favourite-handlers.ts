/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { BACKEND_API } from "@/services/domain/constants";
import { http, HttpResponse } from "msw";
import { favouriteResponse } from "../data/favourite";

const addToFavourite = http.post(`${BACKEND_API}/favorite-car`, async () => {
  return HttpResponse.json(favouriteResponse, { status: 201 });
});

const deletefavourite = http.delete(
  `${BACKEND_API}/favorite-car/:id`,
  async () => {
    return HttpResponse.json(
      { message: "Auto eliminado de favoritos correctamente" },

      { status: 200 }
    );
  }
);
const getMyFavourites = http.get(`${BACKEND_API}/favorite-car/me`, async () => {
  return HttpResponse.json([favouriteResponse], { status: 200 });
});
export const favouriteHandlers = [addToFavourite,deletefavourite,getMyFavourites];

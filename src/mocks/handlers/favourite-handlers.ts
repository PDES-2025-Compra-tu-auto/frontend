import { BACKEND_API } from "@/services/domain/constants";
import { http, HttpResponse } from "msw";
import { favouriteResponse } from "../data/favourite";

const addToFavourite = http.post(
  `${BACKEND_API}/favorite-car`,
  async () => {

    return HttpResponse.json(favouriteResponse,{status:201})
  }
);


export const favouriteHandlers = [addToFavourite];

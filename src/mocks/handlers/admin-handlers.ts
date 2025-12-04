/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { BACKEND_API } from "@/services/domain/constants";
import { http, HttpResponse } from "msw";
import { buyersList, carReviewStatsList, carSalesList, sellersList } from "../data/reports";
import { users } from "../data/user";
import { reviews } from "../data/reviews";
import { favouriteResponse } from "../data/favourite";
import { purchaseResponses } from "../data/car";

const topSoldCars = http.get(
  `${BACKEND_API}/admin/reports/top-sold-cars`,
  async () => {
  return HttpResponse.json(carSalesList, { status: 200 });

  }
);

const topBuyer = http.get(
  `${BACKEND_API}/admin/reports/top-buyers`,
  async () => {
  return HttpResponse.json(buyersList, { status: 200 });

  }
);

const topRatedCars = http.get(
  `${BACKEND_API}/admin/reports/top-rated-cars`,
  async () => {
  return HttpResponse.json(carReviewStatsList, { status: 200 });

  }
);

const topAgencies = http.get(
  `${BACKEND_API}/admin/reports/top-agencies`,
  async () => {
  return HttpResponse.json(sellersList, { status: 200 });

  }

);

const allReviews = http.get(
  `${BACKEND_API}/admin/reviews`,
  async () => {
  return HttpResponse.json(reviews, { status: 200 });

  }

);
const allFavourites=  http.get(
  `${BACKEND_API}/admin/favorites`,
  async () => {
  return HttpResponse.json([favouriteResponse], { status: 200 });

  }

);
const allPurchases = http.get(
  `${BACKEND_API}/admin/purchases`,
  async () => {
  return HttpResponse.json(purchaseResponses, { status: 200 });

  }

);
const allUsers = http.get(
  `${BACKEND_API}/admin/users`,
  async () => {
  return HttpResponse.json(users, { status: 200 });

  }

);
export const adminHandlers = [topAgencies,topBuyer,topRatedCars,topSoldCars,allReviews,allFavourites,allPurchases,allUsers];

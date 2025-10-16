/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { BACKEND_API } from "@/services/domain/constants";
import { http, HttpResponse } from "msw";
import { reviewReponse, reviews } from "../data/reviews";

const getReviewsByModelCar = http.get(
  `${BACKEND_API}/reviews/model/:id`, 
  async () => {
    return HttpResponse.json(reviews, { status: 200 });

  }
);

const addReview = http.post(
  `${BACKEND_API}/reviews`,
  async () => {
    return HttpResponse.json(reviewReponse)
  })

export const reviewsHandler = [addReview,getReviewsByModelCar];

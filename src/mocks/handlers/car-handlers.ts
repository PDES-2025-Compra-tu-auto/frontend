import { BACKEND_API } from "@/services/domain/constants";
import { delay, http, HttpResponse } from "msw";
import { saleCarItems } from "../data/car";

const getSaleCars = http.get(`${BACKEND_API}/sale-car`, async () => {
  return HttpResponse.json(saleCarItems, { status: 200 });
});

const getSaleCarById = http.get(
  `${BACKEND_API}/sale-car/:id`,
  async ({ params }) => {
    const { id } = params;
    const car = saleCarItems.find((item) => item.id === id);

    if (car) {
      return HttpResponse.json(car, { status: 200 });
    } else {
      return HttpResponse.json({ message: "Car not found" }, { status: 404 });
    }
  }
);
const createSaleCar = http.post(`${BACKEND_API}/sale-car`, async () => {
  await delay(2000);

  return HttpResponse.json(saleCarItems[0], { status: 201 });
});

export const carHandlers = [getSaleCarById, getSaleCars, createSaleCar];

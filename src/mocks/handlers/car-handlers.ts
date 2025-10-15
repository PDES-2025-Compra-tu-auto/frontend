import { BACKEND_API } from "@/services/domain/constants";
import { delay, http, HttpResponse } from "msw";
import { carModels, purchaseResponse, saleCarItems } from "../data/car";

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


const getModelCars = http.get(`${BACKEND_API}/model-cars`, async () => {
  return HttpResponse.json(carModels, { status: 200 });
});

const buyCar =  http.post(`${BACKEND_API}/purchases/:saleCarId`, async () => {
  await delay(2000);

  return HttpResponse.json(purchaseResponse, { status: 200 });
});

export const carHandlers = [getSaleCarById, getSaleCars, createSaleCar,getModelCars,buyCar];

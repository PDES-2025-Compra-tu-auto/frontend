import type { SaleCarResponse } from "../cars/types";
import type { Buyer } from "../reviews/types";

export interface FavoriteResponse {
  id: string;
  buyer: Buyer;
  dateAdded: string; 
  saleCar: SaleCarResponse;
}

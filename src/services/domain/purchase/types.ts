import type { SaleCarResponse } from "../cars/types";
import type { Buyer } from "../reviews/types";
import type { UserResponseDto } from "../user/types";

export interface PurchaseResponse {
  id: string;
  purchasedPrice: number;
  patent: string;
  createdAt: string;
  buyer: Buyer;
  saleCar: SaleCarResponse;
  soldBy: UserResponseDto;
}

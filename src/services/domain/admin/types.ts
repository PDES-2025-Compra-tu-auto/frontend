
export interface CarSalesStats {
  id: string;
  brand: string;
  model: string;
  totalSales: number;
}

export interface BuyerStats {
  id: string;
  name: string;
  email: string;
  totalPurchases: number;
}

export interface CarReviewStats {
  id: string;
  brand: string;
  model: string;
  averageScore: number;
  totalReviews: number;
}

export interface ConcesionaryStats {
  id: string;
  name: string | null;
  cuit: string | null;
  totalSales: number;
}


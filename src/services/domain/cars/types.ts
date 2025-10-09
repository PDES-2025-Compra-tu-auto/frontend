export enum AvailabilityCar {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE= 'UNAVAILABLE'
}

export interface SaleCarResponse {
  id: string;
  price: number;
  status: AvailabilityCar
  modelCar: ModelCar;
  concesionary: Concessionary;
}

export interface ModelCar {
  id: string; 
  brand: string;
  model: string;
  description: string;
  imageUrl: string; 
}

interface Concessionary {
  id: string; 
  concessionaryName: string;
  email:string
}

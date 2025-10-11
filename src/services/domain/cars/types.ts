export enum AvailabilityCar {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE= 'UNAVAILABLE'
}

export interface BasicSaleCar{
    id:string 
    price:number
}

export interface SaleCarResponse extends BasicSaleCar{
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

export enum AvailabilityCar {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE= 'NOT_AVAILABLE'
}

export interface BasicSaleCar{
    id:string 
    favoriteId?:string|null,
    price:number
    favoritedByUser:boolean
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

export interface SaleCarParams {
  minPrice: number 
  maxPrice: number
  status: AvailabilityCar
  modelId:string 
  concesionaryId:string 
  keyword:string //brand
}
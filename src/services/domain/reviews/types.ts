export interface ReviewResponse {
  id: string;
  createdAt: string; 
  score: number;
  comment: string;
  modelCar: ModelCar;
  buyer: Buyer;
}

export interface ModelCar {
  id: string;
  brand: string;
  model: string;
  description: string;
  imageUrl?:string
}

export interface Buyer {
  id: string;
  fullname: string;
  email: string;
  role: "BUYER"; 
  createdAt: string; 
}


export interface AddReview {
    modelCarId:string 
    score:number
    comment:string
}
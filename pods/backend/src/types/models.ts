export interface Distillery {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  distillery_id: string;
  name: string;
  rating: number;
  type: string;
  price: number;
}

export interface User {
  id: string;
  distillery_id: string;
  name: string;
  email: string;
}
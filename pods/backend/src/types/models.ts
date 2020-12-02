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

export interface Order {
  id: string;
  original_price: number;
  discounted_price: number;
  status: string;
  user_id: string;
}

export interface OrderItem {
  order_id: string;
  item_id: string;
  count: number;
}

export interface OrderLogEntry {
  order_id: string;
  status: string;
  date: Date;
}

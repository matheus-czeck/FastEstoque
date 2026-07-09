export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProduct {
  name: string;
  price: number;
  quantity: number;
}

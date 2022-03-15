import { Product } from "./Product";

export type CartItem = {
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  user: string;
  items: CartItem[];
};

export type CartPayload = {
  productId: string;
  quantity?: number;
}

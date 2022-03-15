import { Product } from "./Product";

export type OrderPayload = {
  paymentMethod: string;
  deliveryMethod: string;
};

export type OrderItem = {
  quantity: number;
  product: Product;
};

export type Order = {
  id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  deliveryMethod: string;
  createdAt: string;
};

export enum OrderStatus {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

import api from "../utils/api";

import { catchError } from "../utils/catchError";

import { Order, OrderPayload } from "../types/Order";

const getOrders = async (): Promise<Order[]> => {
  try {
    const url = "/orders";
    const { data } = await api.get(url);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[getOrders]"));
  }
};

const createOrder = async (payload: OrderPayload): Promise<Order> => {
  try {
    const url = "/orders";
    const { data } = await api.post(url, payload);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[createOrder]"));
  }
};

export const OrdersService = {
  getOrders,
  createOrder,
};

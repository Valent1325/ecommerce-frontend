import api from "../utils/api";

import { catchError } from "../utils/catchError";

import { Cart, CartPayload } from "../types/Cart";

const getCart = async (): Promise<Cart> => {
  try {
    const url = "/cart";
    const { data } = await api.get(url);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[getCart]"));
  }
};

const addToCart = async (payload: CartPayload): Promise<Cart> => {
  try {
    const url = "/cart";
    const { data } = await api.post(url, payload);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[addToCart]"));
  }
};

const updateCart = async (payload: CartPayload): Promise<Cart> => {
  try {
    const url = `/cart/${payload.productId}`;
    const { data } = await api.put(url, { quantity: payload.quantity });
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[updateCart]"));
  }
};

const removeFromCart = async (payload: CartPayload): Promise<Cart> => {
  try {
    const url = `/cart/${payload.productId}`;
    const { data } = await api.delete(url);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[removeFromCart]"));
  }
};

const clearCart = async (): Promise<Cart> => {
  try {
    const url = "/cart/clear";
    const { data } = await api.delete(url);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[clearCart]"));
  }
};

export const CartService = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
};

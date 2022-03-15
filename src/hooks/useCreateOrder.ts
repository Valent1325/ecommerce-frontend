import { useCallback, useState } from "react";

import { mutate } from "swr";

import { OrdersService } from "../services/OrdersService";

import { OrderPayload } from "../types/Order";

export const useCreateOrder = () => {
  const [status, setStatus] = useState({
    pending: false,
    error: null,
  });

  const { pending, error } = status;

  const createOrder = useCallback(
    async (payload: OrderPayload) => {
      setStatus({ ...status, pending: true });
      try {
        await OrdersService.createOrder(payload);
        mutate("/api/cart");
        mutate("/api/orders");
        setStatus({ pending: false, error: null });
      } catch (e: any) {
        setStatus({ pending: false, error: e.message });
      }
    },
    [status]
  );

  return {
    createOrder,
    pending,
    error,
  };
};

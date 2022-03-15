import { useCallback, useState } from "react";

import { mutate } from "swr";

import { CartService } from "../services/CartService";

import { CartPayload } from "../types/Cart";

export const useUpdateCart = () => {
  const [status, setStatus] = useState({
    pending: false,
    error: null,
  });

  const { pending, error } = status;

  const updateCart = useCallback(
    async (payload: CartPayload) => {
      setStatus({ ...status, pending: true });
      try {
        await CartService.updateCart(payload);
        mutate("/api/cart");
        setStatus({ pending: false, error: null });
      } catch (e: any) {
        setStatus({ pending: false, error: e.message });
      }
    },
    [status]
  );

  return {
    updateCart,
    pending,
    error,
  };
};

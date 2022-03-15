import { useCallback, useState } from "react";

import { mutate } from "swr";

import { CartService } from "../services/CartService";

export const useClearCart = () => {
  const [status, setStatus] = useState({
    pending: false,
    error: null,
  });

  const { pending, error } = status;

  const clearCart = useCallback(
    async () => {
      setStatus({ ...status, pending: true });
      try {
        await CartService.clearCart();
        mutate("/api/cart");
        setStatus({ pending: false, error: null });
      } catch (e: any) {
        setStatus({ pending: false, error: e.message });
      }
    },
    [status]
  );

  return {
    clearCart,
    pending,
    error,
  };
};

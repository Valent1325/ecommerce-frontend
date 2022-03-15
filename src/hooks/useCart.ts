import useSWR from "swr";

import { useUser } from "./useUser";

import { CartService } from "../services/CartService";

export const useCart = () => {
  const { user } = useUser();
  const { data, error } = useSWR(
    user ? "/api/cart" : null,
    CartService.getCart
  );

  const isLoading = !data && !error;

  return {
    cart: data,
    error,
    isLoading,
  };
};

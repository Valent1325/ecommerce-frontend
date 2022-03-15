import useSWR from "swr";

import { UserService } from "../services/UserService";

export const useUser = () => {
  const token = localStorage.getItem("token");

  const { data, error } = useSWR(
    token ? "/api/account" : null,
    UserService.getProfile
  );

  const isLoading = !data && !error;

  return {
    user: token ? data : null,
    error,
    isLoading,
  };
};

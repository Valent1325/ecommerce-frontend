import { useCallback } from "react";

import { mutate } from "swr";

export const useLogout = () => {
  return useCallback(async () => {
    localStorage.removeItem("token");
    mutate("/api/acccount");
  }, []);
};

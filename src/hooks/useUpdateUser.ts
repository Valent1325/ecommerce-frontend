import { useCallback, useState } from "react";

import { mutate } from "swr";

import { UserService } from "../services/UserService";

export const useUpdateUser = () => {
  const [status, setStatus] = useState({
    pending: false,
    error: null,
  });

  const { pending, error } = status;

  const updateUser = useCallback(
    async (payload: FormData) => {
      setStatus({ ...status, pending: true });
      try {
        await UserService.updateProfile(payload);
        mutate("/api/account");
        setStatus({ pending: false, error: null });
      } catch (e: any) {
        setStatus({ pending: false, error: e.message });
      }
    },
    [status]
  );

  return {
    updateUser,
    pending,
    error,
  };
};

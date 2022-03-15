import { useCallback, useState } from "react";

import { mutate } from "swr";

import { UserService } from "../services/UserService";

import { ChangePasswordPayload } from "../types/User";

export const useChangePassword = () => {
  const [status, setStatus] = useState({
    pending: false,
    error: null,
  });

  const { pending, error } = status;

  const changePassword = useCallback(
    async (payload: ChangePasswordPayload) => {
      setStatus({ ...status, pending: true });
      try {
        const { token } = await UserService.changePassword(payload);
        localStorage.setItem("token", token);
        mutate("/api/account");
        setStatus({ pending: false, error: null });
      } catch (e: any) {
        setStatus({ pending: false, error: e.message });
      }
    },
    [status]
  );

  return {
    changePassword,
    pending,
    error,
  };
};

import { useCallback } from "react";

import { mutate } from "swr";

import { AuthService } from "../services/AuthService";

import { LoginData } from "../types/Auth";

export const useLogin = () => {
  return useCallback(async (payload: LoginData) => {
    const { token } = await AuthService.login(payload);
    localStorage.setItem("token", token);
    mutate("/api/acccount");
  }, []);
};

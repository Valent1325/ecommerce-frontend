import { useCallback } from "react";

import { mutate } from "swr";

import { AuthService } from "../services/AuthService";

import { SignUpData } from "../types/Auth";

export const useSignUp = () => {
  return useCallback(async (payload: SignUpData) => {
    await AuthService.signUp(payload);
    mutate("/api/acccount");
  }, []);
};

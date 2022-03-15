import api from "../utils/api";

import { catchError } from "../utils/catchError";

import { LoginData, SignUpData } from "../types/Auth";
import { UserData } from "../types/User";

const login = async (payload: LoginData): Promise<UserData> => {
  try {
    const url = "/auth/login";
    const { data } = await api.post(url, payload);
    return {
      user: data.data.user,
      token: data.data.token
    };
  } catch (e: any) {
    throw new Error(catchError(e, "[login]"));
  }
};

const signUp = async (payload: SignUpData): Promise<UserData> => {
  try {
    const url = "/auth/signup";
    const { data } = await api.post(url, payload);
    return {
      user: data.data.user,
      token: data.data.token
    };
  } catch (e: any) {
    throw new Error(catchError(e, "[signUp]"));
  }
};

export const AuthService = {
  login,
  signUp
};

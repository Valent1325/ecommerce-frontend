import api from "../utils/api";

import { catchError } from "../utils/catchError";

import { ChangePasswordPayload, User, UserData } from "../types/User";

const getProfile = async (): Promise<User> => {
  try {
    const url = "/account";
    const { data } = await api.get(url);

    return data.data.user;
  } catch (e: any) {
    throw new Error(catchError(e, "[getProfile]"));
  }
};

const updateProfile = async (payload: FormData): Promise<User> => {
  try {
    const url = "/account";
    const { data } = await api.put(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data.user;
  } catch (e: any) {
    throw new Error(catchError(e, "[updateProfile]"));
  }
};

const changePassword = async (
  payload: ChangePasswordPayload
): Promise<UserData> => {
  try {
    const url = "/account/change-password";
    const { data } = await api.put(url, payload);

    return {
      user: data.data.user,
      token: data.data.token,
    };
  } catch (e: any) {
    throw new Error(catchError(e, "[changePassword]"));
  }
};

export const UserService = {
  getProfile,
  updateProfile,
  changePassword,
};

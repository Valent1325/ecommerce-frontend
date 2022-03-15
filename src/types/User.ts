export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
};

export type UserData = {
  user: User;
  token: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

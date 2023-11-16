import apiClient from "./clientApi.ts";

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

const register = async (data: RegisterInterface) => {
  return apiClient.post("/auth/register", data);
};

const changePassword = async (oldPassword: string, newPassword: string) => {
  return apiClient.post("/auth/change/password", { oldPassword, newPassword });
};

const changeEmail = async (email: string) => {
  return apiClient.post("/auth/change/email", { email });
};

const changeUsername = async (username: string) => {
  return apiClient.post("/auth/change/username", { username });
};

export interface LoginInterface {
  identifier: string;
  password: string;
}

const login = async (data: LoginInterface) => {
  return apiClient.post("/auth/login", data);
};

const refresh = async (refreshToken: string) => {
  apiClient.setHeader("Authorization", `JWT ${refreshToken}`);
  return apiClient.get(`/auth/refresh`);
};

const logout = async (refreshToken: string) => {
  apiClient.setHeader("Authorization", `JWT ${refreshToken}`);
  return apiClient.get(`/auth/logout`);
};

export default {
  register,
  changePassword,
  changeEmail,
  changeUsername,
  login,
  refresh,
  logout,
};

import apiClient from "./clientApi";

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
}

const register = async (data: RegisterInterface) => {
  return apiClient.post("/auth/register", data);
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

export default { register, login, refresh, logout };

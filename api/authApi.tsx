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
  credentials: string;
  password: string;
}

const login = async (data: LoginInterface) => {
  return apiClient.post("/auth/login", data);
};

const refresh = async (refreshToken: string) => {
  return apiClient.get(`/auth/refresh`, {
    headers: {
      Authorization: "JWT " + refreshToken,
    },
  });
};

const logout = async (token: string) => {
  return apiClient.get(`/auth/logout`, {
    headers: {
      Authorization: "JWT " + token,
    },
  });
};

export default { register, login, refresh, logout };

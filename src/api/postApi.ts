// import apiClient from "./clientApi.ts";

// const getAllPosts = async () => {
//   return apiClient.get("/post");
// };

// const getPostById = async (id: string) => {
//   return apiClient.get("/post/" + id);
// };

// export interface LoginInterface {
//   identifier: string;
//   password: string;
// }

// const login = async (data: LoginInterface) => {
//   return apiClient.post("/auth/login", data);
// };

// const refresh = async (refreshToken: string) => {
//   apiClient.setHeader("Authorization", `JWT ${refreshToken}`);
//   return apiClient.get(`/auth/refresh`);
// };

// const logout = async (refreshToken: string) => {
//   apiClient.setHeader("Authorization", `JWT ${refreshToken}`);
//   return apiClient.get(`/auth/logout`);
// };

// export default { register, login, refresh, logout };

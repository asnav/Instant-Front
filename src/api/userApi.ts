import FormData from "form-data";

import apiClient from "./clientApi.ts";

export interface EditUserInterface {
  avatarUrl?: string;
  name?: string;
}

const getUser = async (userId: string) => {
  return apiClient.get(`/user/${userId}`);
};

const editUserInfo = async (userId: string, userData: EditUserInterface) => {
  return apiClient.post(`/user/edit-user/${userId}`, userData);
};

const uploadUserImage = async (image: FormData) => {
  return apiClient.post(`/file/file`, image);
};

export default {
  getUser,
  editUserInfo,
  uploadUserImage,
};

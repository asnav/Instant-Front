import apiClient from "./clientApi.ts";
import FormData from "form-data";

const upload = async (imageUri: string) => {
  const body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageUri });
  return apiClient.post("/file/upload", body);
};

export default { upload };

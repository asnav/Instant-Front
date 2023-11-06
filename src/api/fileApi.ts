import apiClient from "./clientApi.ts";
import FormData from "form-data";

const upload = async (postId: string, imageUri: string) => {
  const body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageUri });
  return apiClient.post("/file/upload/" + postId, body);
};

export default { upload };

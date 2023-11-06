import apiClient from "./clientApi.ts";

const getAllPosts = async () => {
  return apiClient.get("/post");
};

const getUsersPosts = async (owner: string) => {
  return apiClient.get("/post?owner=" + owner);
};

const getPostById = async (id: string) => {
  return apiClient.get("/post/" + id);
};

const addNewPost = async (text: string) => {
  return apiClient.post("/post", { text: text });
};

const updatePost = async (postId: string, text: string) => {
  return apiClient.put("/post/" + postId, { text: text });
};

export default { getAllPosts, getUsersPosts, getPostById, addNewPost, updatePost };

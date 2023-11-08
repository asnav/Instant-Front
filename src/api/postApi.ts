import apiClient from "./clientApi.ts";

const getAllPosts = async () => {
  return apiClient.get("/post");
};

const getUsersPosts = async (owner: string) => {
  return apiClient.get("/post?owner=" + owner);
};

const getPostById = async (postId: string) => {
  return apiClient.get("/post/" + postId);
};

const addNewPost = async (text: string) => {
  return apiClient.post("/post", { text: text });
};

const updatePost = async (postId: string, text: string) => {
  return apiClient.put("/post/" + postId, { text: text });
};

const deletePost = async (postId: string) => {
  return apiClient.get("/post/delete/" + postId);
};

export default {
  getAllPosts,
  getUsersPosts,
  getPostById,
  addNewPost,
  updatePost,
  deletePost,
};

import postApi from "../api/postApi.ts";
import fileApi from "../api/fileApi.ts";

export type Post = {
  postId: string;
  text: string;
  ownerId: string;
  username: string;
};

var allPosts: Array<Post> = new Array<Post>();
var myPosts: Array<Post> = new Array<Post>();
export { allPosts, myPosts };

export const getAllPosts = async () =>
  (allPosts = ((await postApi.getAllPosts()).data as Array<Post>).reverse());

export const getMyPosts = async (userId: string) =>
  (myPosts = (
    (await postApi.getUsersPosts(userId)).data as Array<Post>
  ).reverse());

export const getPost = async (postId: string) =>
  (await postApi.getPostById(postId)).data as Post;

export const uploadPost = async (imageUri: string, text: string) => {
  const data: Post = (await postApi.addNewPost(text)).data as Post;
  await fileApi.upload(data.postId, imageUri);
};

export const updatePostText = async (postId: string, text: string) => {
  await postApi.updatePost(postId, text);
};

export const updatePostImage = async (postId: string, imageUri: string) => {
  fileApi.upload(postId, imageUri);
};

export const deletePost = async (postId: string) => {
  await postApi.deletePost(postId);
};

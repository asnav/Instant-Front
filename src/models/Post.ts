import postApi from "../api/postApi.ts";
import fileApi from "../api/fileApi.ts";

export type Post = {
  postId: string;
  text: string;
  ownerId: string;
  username: string;
};

var posts: Array<Post> = new Array<Post>();

export const getAllPosts = () => posts;

export const refresh = async () =>
  (posts = (await postApi.getAllPosts()).data as Array<Post>);

export const uploadPost = async (imageUri: string, text: string) => {
  const data: Post = (await postApi.addNewPost(text)).data as Post;
  fileApi.upload(data.postId, imageUri);
};

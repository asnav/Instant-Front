import postApi from "../api/postApi.ts";
import fileApi from "../api/fileApi.ts";

export type Post = {
  text: string;
  owner: string;
  _id: string;
  __v: number;
};

var posts: Array<Post> = new Array<Post>();

export const getAllPosts = () => posts;

export const refresh = async () =>
  (posts = (await postApi.getAllPosts()).data as Array<Post>);

export const uploadPost = async (imageUri: string, text: string) => {
  const data: Post = (await postApi.addNewPost(text)).data as Post;
  fileApi.upload(data._id, imageUri);
};

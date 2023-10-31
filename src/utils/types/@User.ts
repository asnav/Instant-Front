import { Post } from "./@Post.ts";

export interface User {
  avatarUrl: string;
  email: string;
  name: string;
  posts: Post[];
}

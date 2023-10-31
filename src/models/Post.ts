export type Post = {
  postId: string;
  // ownerId: string,
  ownerName: string;
  imageURI: string;
  text: string;
  // likes: number,
  // isLiked: boolean,
};

var posts: Array<Post> = [
  {
    postId: "65356eac0ea5fda12e30ff5c",
    // ownerId: "653a8197bedc5888925e40e7",
    ownerName: "asaf navon",
    imageURI: "../../assets/cart.png",
    text: "my first post",
    // likes: 10,
    // isLiked: false,
  },
  {
    postId: "65356eac0ea5fda12e30ff5b",
    // ownerId: "653a8197bedc5888925e40e7",
    ownerName: "avraham kabala",
    imageURI: "../../assets/icon.png",
    text: "my first post",
    // likes: 10,
    // isLiked: false,
  },
  {
    postId: "65356eac0ea5fda12e30ff5a",
    // ownerId: "653a8197bedc5888925e40e7",
    ownerName: "avraham kabala",
    imageURI: "../../assets/icon.png",
    text: "my first post",
    // likes: 10,
    // isLiked: false,
  },
];

export const getAllPosts = () => {
  return posts;
};

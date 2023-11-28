import React, { FC } from "react";
import { FlatList } from "react-native";
import { Post } from "../../models/Post.ts";
import PostButton from "../Buttons/PostButton.tsx";

const formatData = (data: Array<Post>) => {
  const blank: Post = {
    postId: "",
    text: "",
    ownerId: "",
    username: "",
  };
  if (data.length % 3 == 0) return data;
  if (data.length % 3 == 2) return [...data, blank];
  if (data.length % 3 == 1) return [...data, blank, blank];
};

const PostsArea: FC<{
  posts: Array<Post>;
  navigation: any;
}> = ({ posts, navigation }) => {
  return (
    <FlatList
      ///my posts area
      data={formatData(posts)}
      keyExtractor={(post: Post) => post.postId}
      renderItem={({ item }) => (
        <PostButton post={item} navigation={navigation} />
      )}
      numColumns={3}
    />
  );
};

export default PostsArea;

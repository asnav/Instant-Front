import React, { FC } from "react";
import { FlatList, View } from "react-native";
import PostComponent from "../../components/posts/Post.tsx";
import { getAllPosts, Post } from "../../models/Post.ts";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <FlatList
      data={getAllPosts()}
      keyExtractor={(post: Post) => post.postId.toString()}
      renderItem={({ item }) => <PostComponent post={item} />}
    />
  );
};

export default FeedScreen;

import React, { FC, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import PostComponent from "../../components/posts/PostComponent.tsx";
import { allPosts, getAllPosts, Post } from "../../models/Post.ts";
import TabTitle from "../../components/TabTitle.tsx";
import { Image } from "expo-image";
import theme from "../../core/theme.ts";
import LoadingLottie from "../../components/LoadingLottie.tsx";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(allPosts);
  const setPostsAsync = async () => {
    setIsLoading(true);
    await Image.clearMemoryCache();
    await Image.clearDiskCache();
    const response = await getAllPosts();
    setPosts(response);
    setIsLoading(false);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && setPostsAsync();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <TabTitle>Feed</TabTitle>
      <FlatList
        data={posts}
        keyExtractor={(post: Post) => post.postId}
        renderItem={({ item }) => <PostComponent post={item} />}
      />
      {isLoading && <LoadingLottie />}
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});

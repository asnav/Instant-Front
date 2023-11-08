import React, { FC, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// import { ScrollView } from 'react-native-virtualized-view';

import PostComponent from "../../components/posts/PostComponent.tsx";
import { getAllPosts, Post } from "../../models/Post.ts";
import TabTitle from "../../components/TabTitle.tsx";
import theme from "../../core/theme.ts";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [posts, setPosts] = useState(new Array<Post>());
  const setPostsAsync = async () => setPosts(await getAllPosts());

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

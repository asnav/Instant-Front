import React, { FC, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
// import { ScrollView } from 'react-native-virtualized-view';

import PostComponent from "../../components/posts/Post.tsx";
import { getAllPosts, Post, refresh } from "../../models/Post.ts";
import TabTitle from "../../components/TabTitle.tsx";
import theme from "../../core/theme.ts";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [posts, setPosts] = useState(getAllPosts());
  const setPostsAsync = async () => setPosts(await refresh());

  useEffect(() => {
    setPostsAsync();
  }, []);
  return (
    <View style={styles.container}>
      <TabTitle>Feed</TabTitle>
      <FlatList
        style={styles.list}
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
  list: {
    paddingTop: 5,
  },
});

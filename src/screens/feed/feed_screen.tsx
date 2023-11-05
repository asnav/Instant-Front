import React, { FC } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PostComponent from "../../components/posts/Post.tsx";
import { getAllPosts, Post } from "../../models/Post.ts";
import TabTitle from "../../components/TabTitle.tsx";
import theme from "../../core/theme.ts";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TabTitle>Feed</TabTitle>
      <FlatList
        style={styles.list}
        data={getAllPosts()}
        keyExtractor={(post: Post) => post.postId.toString()}
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

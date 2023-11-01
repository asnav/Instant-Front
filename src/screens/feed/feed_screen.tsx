import React, { FC } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PostComponent from "../../components/posts/Post.tsx";
import { getAllPosts, Post } from "../../models/Post.ts";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
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
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 33,
    color: "black",
    fontWeight: "bold",
  },
  list: {
    paddingTop: 5,
  },
});

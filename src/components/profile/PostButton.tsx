import React, { FC } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../../core/theme.ts";
import { Post } from "../../models/Post.ts";
import { baseURL } from "../../constants/constants.ts";

const PostButton: FC<{ post: Post; navigation: any }> = ({
  post,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("UpdatePost", { post: post })}
    >
      <Image
        source={{ uri: baseURL + "/uploads/" + post.postId + ".jpg" }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default PostButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0.5,
    backgroundColor: theme.colors.background,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
  },
});

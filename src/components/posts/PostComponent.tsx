import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";

import theme from "../../core/theme.ts";
import { Post } from "../../models/Post.ts";
import { baseURL } from "../../constants/constants.ts";

const PostComponent: FC<{ post: Post }> = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ownerContainer}>
        <Image
          placeholder={require("../../assets/headshot.png")}
          placeholderContentFit="contain"
          source={{ uri: baseURL + "/uploads/" + post.ownerId + ".jpg" }}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>{post.username}</Text>
      </View>
      <Image
        source={{ uri: baseURL + "/uploads/" + post.postId + ".jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>{post.text}</Text>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    width: "100%",
    paddingVertical: 5,
  },
  text: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5,
  },
  username: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

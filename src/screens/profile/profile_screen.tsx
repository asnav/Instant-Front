import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { getMyPosts, Post } from "../../models/Post.ts";

import TabTitle from "../../components/TabTitle.tsx";
import { ScrollView } from "react-native-virtualized-view";
import ProfileArea from "../../components/profile/ProfileArea.tsx";
import PostsArea from "../../components/profile/PostsArea.tsx";
import theme from "../../core/theme.ts";

const ProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { authData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(new Array<Post>());
  const setPostsAsync = async () =>
    setPosts(await getMyPosts(authData?.userId as string));

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && setPostsAsync();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <TabTitle>Profile</TabTitle>
      <ScrollView scrollEnabled={!isLoading}>
        <ProfileArea isLoading={isLoading} />
        <PostsArea
          posts={posts}
          navigation={navigation}
          isLoading={isLoading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default ProfileScreen;

import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { getMyPosts, myPosts } from "../../models/Post.ts";

import TabTitle from "../../components/TabTitle.tsx";
import { ScrollView } from "react-native-virtualized-view";
import ProfileArea from "../../components/profile/ProfileArea.tsx";
import PostsArea from "../../components/profile/PostsArea.tsx";
import theme from "../../core/theme.ts";

const ProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { authData } = useContext(AuthContext);

  const [posts, setPosts] = useState(myPosts);
  const setPostsAsync = async () => {
    const response = await getMyPosts(authData?.userId as string);
    response != posts && setPosts(response);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && setPostsAsync();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TabTitle>Profile</TabTitle>
      <ScrollView>
        <ProfileArea />
        <PostsArea posts={posts} navigation={navigation} />
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

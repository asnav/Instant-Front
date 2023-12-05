import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { getMyPosts, myPosts } from "../../models/Post.ts";
import { Post } from "../../models/Post.ts";

import TabTitle from "../../components/TabTitle.tsx";
import { ScrollView } from "react-native-virtualized-view";
import ProfileArea from "../../components/profile/ProfileArea.tsx";
import PostsArea from "../../components/profile/PostsArea.tsx";
import theme from "../../core/theme.ts";
import LoadingLottie from "../../components/LoadingLottie.tsx";
import PostButton from "../../components/Buttons/PostButton.tsx";

const formatData = (data: Array<Post>) => {
  const blank: Post = {
    postId: "",
    text: "",
    ownerId: "",
    username: "",
  };
  if (data.length % 3 == 0) return data;
  if (data.length % 3 == 2) return [...data, blank];
  if (data.length % 3 == 1) return [...data, blank, blank];
};

const ProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { authData } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
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
      <FlatList
        ListHeaderComponent={
          <ProfileArea isLoading={isLoading} setIsLoading={setIsLoading} />
        }
        data={formatData(posts)}
        keyExtractor={(post: Post) => post.postId}
        renderItem={({ item }) => (
          <PostButton post={item} navigation={navigation} />
        )}
        numColumns={3}
      />
      {isLoading && <LoadingLottie />}
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

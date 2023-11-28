import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { getMyPosts, myPosts } from "../../models/Post.ts";

import TabTitle from "../../components/TabTitle.tsx";
import { ScrollView } from "react-native-virtualized-view";
import ProfileArea from "../../components/profile/ProfileArea.tsx";
import PostsArea from "../../components/profile/PostsArea.tsx";
import LottieView from "lottie-react-native";
import theme from "../../core/theme.ts";

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
      <ScrollView scrollEnabled={!isLoading}>
        <ProfileArea isLoading={isLoading} setIsLoading={setIsLoading} />
        <PostsArea
          posts={posts}
          navigation={navigation}
          isLoading={isLoading}
        />
      </ScrollView>
      {isLoading && (
        <View style={styles.animation_container}>
          <LottieView
            style={styles.loading}
            source={require("../../assets/loading.json")}
            autoPlay
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  animation_container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    width: 200,
    position: "absolute",
  },
});

export default ProfileScreen;

import React, { FC, useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { getMyPosts, Post } from "../../models/Post.ts";

import TabTitle from "../../components/TabTitle.tsx";
import theme from "../../core/theme.ts";
import SubmitButton from "../../components/SubmitButton.tsx";
import { useIsFocused } from "@react-navigation/native";
import MyPostComponent from "../../components/profile/PostButton.tsx";
import { ScrollView } from "react-native-virtualized-view";

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
  const { logout, authData } = useContext(AuthContext);
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

      <ScrollView>
        <View>
          {
            /// profile area
          }
          <SubmitButton onPress={async () => logout()}>Logout</SubmitButton>
        </View>
        <FlatList
          ///my posts area
          data={formatData(posts)}
          keyExtractor={(post: Post) => post.postId}
          renderItem={({ item }) => (
            <MyPostComponent post={item} navigation={navigation} />
          )}
          numColumns={3}
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

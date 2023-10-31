import React, { FC } from "react";
import { FlatList, Text, View } from "react-native";
import Post from "../../components/posts/Post";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={[{ id: 1 }, { id: 2 }]}
        keyExtractor={(obj: Object | any) => obj.id.toString()}
        renderItem={() => <Post />}
      />
    </View>
  );
};

export default FeedScreen;

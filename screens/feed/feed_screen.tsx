import React, { FC } from "react";
import { Button, Text, View } from "react-native";

const FeedScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed!</Text>
    </View>
  );
};

export default FeedScreen;

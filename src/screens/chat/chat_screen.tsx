import React, { FC } from "react";
import { Text, View } from "react-native";

const ChatScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(route.params.id)}</Text>
    </View>
  );
};

export default ChatScreen;

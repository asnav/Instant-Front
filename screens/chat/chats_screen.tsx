import React, { FC } from "react";
import { Button, Text, View } from "react-native";

const ChatsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats!</Text>
      <Button
        title="Chat 123"
        onPress={() => navigation.push("Chat", { id: "123" })}
      />
      <Button
        title="Chat 456"
        onPress={() => navigation.push("Chat", { id: "456" })}
      />
    </View>
  );
};

export default ChatsScreen;

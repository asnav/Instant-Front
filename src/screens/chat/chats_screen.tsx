import React, { FC } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ChatItem from "../../components/chats/ChatItem.tsx";
import { Chat, getAllchats } from "../../models/Chat.ts";

const ChatsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        style={styles.list}
        data={getAllchats()}
        keyExtractor={(chat: Chat) => chat.userId.toString()}
        renderItem={({ item }) => (
          <ChatItem
            title={item.username.toString()}
            onPress={() => navigation.push("Chat", { id: item.userId })}
          />
        )}
      />
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    marginTop: 60,
    marginLeft: 15,
    fontSize: 33,
    color: "black",
    fontWeight: "bold",
  },
  list: {
    paddingTop: 5,
  },
});

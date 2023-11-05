import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Chat, getAllchats } from "../../models/Chat.ts";
import ChatItem from "../../components/chats/ChatItem.tsx";
import TabTitle from "../../components/TabTitle.tsx";
import theme from "../../core/theme.ts";

const ChatsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TabTitle>Chats</TabTitle>
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
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  list: {
    paddingTop: 5,
  },
});

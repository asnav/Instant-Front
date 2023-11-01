import { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import Header from "../../components/chats/Header.tsx";
import { Chat, Message, getAllchats, getChatById } from "../../models/Chat.ts";
import MessageBubble from "../../components/chats/MessageBubble.tsx";
import ChatInput from "../../components/chats/ChatInput.tsx";

const ChatScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const chat = getChatById(route.params.id) as Chat;

  const [newMessage, setNewMessage] = useState("");
  const sendMessage = () => {
    setNewMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-30}
    >
      <Header>{chat.username}</Header>
      <FlatList
        inverted={true}
        data={[...chat.messages].reverse() as Array<Message>}
        keyExtractor={(message: Message) => message.messageId}
        renderItem={({ item }) => <MessageBubble message={item} />}
      />
      <ChatInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={sendMessage}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
});

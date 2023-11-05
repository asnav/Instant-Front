import { FC, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, FlatList, Platform } from "react-native";
import Header from "../../components/chats/Header.tsx";
import { Chat, Message, getChatById } from "../../models/Chat.ts";
import MessageBubble from "../../components/chats/MessageBubble.tsx";
import ChatInput from "../../components/chats/ChatInput.tsx";
import theme from "../../core/theme.ts";

const ChatScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const onGoBack = () => {
    navigation.goBack();
  };

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
      <Header onGoBack={onGoBack}>{chat.username}</Header>
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
    backgroundColor: theme.colors.background,
  },
});

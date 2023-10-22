import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatsScreen from "../../screens/chat/chats_screen";
import ChatScreen from "../../screens/chat/chat_screen";

const Stack = createNativeStackNavigator();

const ChatNavigator: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ headerTitle: "Chats" }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;

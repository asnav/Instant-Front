import React, { FC } from "react";
import { FlatList, View } from "react-native";
import ChatNavigator from "../../components/chats/ChatNavigator.tsx";

const ChatsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={[{ id: 1 }, { id: 2 }]}
        keyExtractor={(obj: Object | any) => obj.id.toString()}
        renderItem={({ item }) => (
          <ChatNavigator
            title={"Chat " + item.id.toString()}
            onPress={() => navigation.push("Chat", { id: item.id })}
          />
        )}
      />
    </View>
  );
};

export default ChatsScreen;

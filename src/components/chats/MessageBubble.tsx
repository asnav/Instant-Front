import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Message } from "../../models/Chat";

export default function MessageBubble(props: { message: Message }) {
  const {authData} = useContext(AuthContext);
  const isMine = props.message.senderId == authData?.userId
  return (
    <View
      style={[
        styles.container,
        { justifyContent: isMine ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={isMine ? styles.myChatBubble : styles.otherChatBubble}>
        <Text style={styles.text}>{props.message.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  myChatBubble: {
    backgroundColor: "lightsalmon",
    marginRight: 10,
    marginLeft: 50,
    borderBottomRightRadius: 3,
    marginVertical: 3,
    borderRadius: 17,
  },
  otherChatBubble: {
    backgroundColor: "whitesmoke",
    marginLeft: 10,
    marginRight: 50,
    borderBottomLeftRadius: 3,
    marginVertical: 3,
    borderRadius: 17,
  },
  text: {
    padding: 10,
    fontSize: 17,
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    margin: 10,
    resizeMode: "contain",
  },
});

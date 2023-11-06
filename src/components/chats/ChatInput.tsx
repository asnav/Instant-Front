import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../core/theme.ts";

export default function ChatInput(props: {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        blurOnSubmit={false}
        onSubmitEditing={props.onSend}
        onChangeText={props.onChangeText}
        returnKeyType={"send"}
        enablesReturnKeyAutomatically
        // multiline
      />
      <Ionicons
        name={"send-outline"}
        size={24}
        color="crimson"
        style={styles.icon}
        onPress={props.onSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 75,
    paddingBottom: 35,
  },
  input: {
    width: "88%",
    marginVertical: 5,
    marginLeft: 10,
    paddingLeft: 10,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: 17,
  },
  icon: {
    width: "12%",
    padding: 7,
  },
});

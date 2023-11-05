import React from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
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
    backgroundColor: "whitesmoke",
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
    backgroundColor: "white",
    color: "black",
    fontSize: 17,
    borderColor: "lightgrey",
    borderWidth: 0.5,
  },
  icon: {
    width: "12%",
    padding: 7,
  },
});

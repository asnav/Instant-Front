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
        onChangeText={props.onChangeText}
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
    height: 70,
    paddingBottom: 30,
  },
  input: {
    width: "88%",
    margin: 5,
    borderRadius: 10,
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

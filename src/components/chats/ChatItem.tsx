import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import theme from "../../core/theme.ts";

export default function ChatItem(props: {
  title: String;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/headshot.png")}
          style={styles.profilePicture}
        />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    marginVertical: 5,
    marginHorizontal: "2%",
    borderRadius: 20,
    flexDirection: "row",
  },
  text: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    margin: 10,
    resizeMode: "contain",
  },
});

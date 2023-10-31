import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import theme from "../../core/theme";

export default function ChatNavigator(props: {
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
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    width: "100%",
    borderColor: "lightgrey",
    borderBottomWidth: 1,
  },
  text: {
    padding: 15,
    fontSize: 17,
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

import React from "react";
import { StyleSheet, View, Text, TextProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../../core/theme.ts";

export default function Header(props: TextProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={"chevron-back-outline"}
        size={40}
        color="black"
        style={styles.icon}
        onPress={() => null}
      />
      <Text style={styles.title} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",

  },
  icon: {
    position: "absolute",
    left: 10,
    top :80,
  },
  title: {
    fontSize: 21,
    color: "black",
    fontWeight: "bold",
  },
});

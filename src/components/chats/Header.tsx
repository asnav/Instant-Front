import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ImageProps, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../../core/theme.ts";

export default function Header(props: {
  image?: ImageProps;
  onGoBack: () => void;
  children: string;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={props.onGoBack}>
        <Ionicons name={"chevron-back-outline"} size={35} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{props.children}</Text>
      <TouchableOpacity onPress={() => null}>
        <Image
          source={require("../../assets/headshot.png")}
          style={styles.profilePicture}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  back: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginRight: 10,
    resizeMode: "contain",
  },
});

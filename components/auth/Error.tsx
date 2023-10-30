import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TextProps } from "react-native";
import theme from "../../core/theme";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function TextField(props: TextProps) {
  return (
    props.children && (
      <View>
        <Text style={styles.error} {...props}>{props.children}</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
    color: theme.colors.error,
    fontWeight: "bold",
  },
});

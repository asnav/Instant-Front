import React from "react";
import { StyleSheet, View, Text, TextProps } from "react-native";
import theme from "../../core/theme.ts";

export default function Title(props: TextProps) {
  return (
    <View>
      <Text style={styles.title} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

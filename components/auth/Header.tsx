import React from "react";
import { StyleSheet, View, Text, TextProps } from "react-native";
import theme from "../../core/theme";

export default function Header(props: TextProps) {
  return (
    <View>
      <Text style={styles.header} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

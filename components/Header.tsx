import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import theme from "../core/theme";
import { Props } from "react-native-paper/lib/typescript/components/Typography/Text";

export default function Header(props: Props<Text>) {
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

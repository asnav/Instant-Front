import { StyleSheet, Text, TextProps, View } from "react-native";
import theme from "../core/theme.ts";

export default function Header(props: TextProps) {
  return (
    <View>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    marginLeft: 15,
    fontSize: 33,
    color: theme.colors.text,
    fontWeight: "bold",
  },
});

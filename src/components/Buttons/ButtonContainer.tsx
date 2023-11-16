import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export default function ButtonContainer(props: { children: ReactNode }) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginVertical: 10,
    marginHorizontal: "12.5%",
    paddingVertical: 12,
    borderRadius: 10,
  },
});

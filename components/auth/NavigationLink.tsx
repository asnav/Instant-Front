import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import theme from "../../core/theme";
import { AuthContext } from "../../context/AuthContext";

export default function TextField(props: TouchableOpacityProps) {
  const { isLoading } = useContext(AuthContext);

  return (
    <TouchableOpacity style={styles.button} disabled={isLoading} {...props}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    paddingBottom: 16,
  },
  text: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
});

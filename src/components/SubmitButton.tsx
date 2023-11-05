import { useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import theme from "../core/theme.ts";
import { AuthContext } from "../context/AuthContext.tsx";

export default function SubmitButton(props: TouchableOpacityProps) {
  const { isLoading } = useContext(AuthContext);

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} disabled={isLoading} {...props}>
        <Text style={styles.text}>{props.children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: "75%",
    margin: 12,
    padding: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

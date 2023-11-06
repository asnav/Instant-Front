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
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: props.disabled
              ? theme.colors.darkGrey
              : theme.colors.primary,
          },
        ]}
        disabled={isLoading}
        {...props}
      >
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
    marginVertical: 12,
    marginHorizontal: "12.5%",
    paddingVertical: 12,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

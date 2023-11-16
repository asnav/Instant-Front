import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import theme from "../../core/theme.ts";

export default function SubmitButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        props.style,
        props.disabled && {
          backgroundColor: theme.colors.darkGrey,
        },
      ]}
    >
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

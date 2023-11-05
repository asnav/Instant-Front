import { useContext, useState } from "react";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../core/theme.ts";

export default function TextField(props: TextInputProps) {
  const { isLoading } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(
    props.autoComplete != "current-password"
  );
  const toggleShowPassword = () => setShowPassword(showPassword ? false : true);

  return (
    <View style={styles.field}>
      <TextInput
        style={styles.input}
        autoCapitalize={"none"}
        secureTextEntry={!showPassword}
        editable={!isLoading}
        selectTextOnFocus={!isLoading}
        enablesReturnKeyAutomatically
        {...props}
      />
      {props.autoComplete == "current-password" && (
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={24}
          color={theme.colors.darkGrey}
          style={styles.icon}
          onPress={toggleShowPassword}
          disabled={isLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.textField,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.darkGrey,
    paddingHorizontal: 14,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});

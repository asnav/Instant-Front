import React, { FC, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../core/theme";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";

// import StudentModel, { Student } from '../model/StudentModel';
// import * as ImagePicker from 'expo-image-picker';

const LoginScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { login } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(showPassword ? false : true);

  const onLoginCallback = async () => {
    if (identifier == "") return setError("Username or Email missing.");
    if (password == "") return setError("Password missing.");
    const res = await login({ identifier: identifier, password: password });
    setError(res as string | undefined);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header>Welcome Back 😄</Header>

      <View style={styles.field}>
        <TextInput
          style={styles.input}
          onChangeText={setIdentifier}
          value={identifier}
          placeholder={"Username or Email"}
          autoCapitalize={"none"}
          autoComplete="username"
          inputMode="email"
        />
      </View>

      <View style={styles.field}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={"Password"}
          autoCapitalize={"none"}
          autoComplete="current-password"
          secureTextEntry={!showPassword}
        />
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>

      {error && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <View style={styles.buttonesContainer}>
        <TouchableOpacity onPress={onLoginCallback} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.navigationButton}
      >
        <Text style={styles.navigationText}>Don't have an account yet?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    color: "#333",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  error: {
    textAlign: "center",
    color: theme.colors.error,
    fontWeight: "bold",
  },
  buttonesContainer: {
    flexDirection: "row",
  },
  button: {
    width: "75%",
    margin: 12,
    padding: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  navigationButton: {
    padding: 12,
    paddingBottom: 16,
  },
  navigationText: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
});

export default LoginScreen;

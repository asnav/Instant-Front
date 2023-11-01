import React, { FC, useContext, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";

import Title from "../../components/auth/Title.tsx";
import TextField from "../../components/auth/TextField.tsx";
import Error from "../../components/auth/Error.tsx";
import SubmitButton from "../../components/auth/SubmitButton.tsx";
import NavigationLink from "../../components/auth/NavigationLink.tsx";

const LoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

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
      keyboardVerticalOffset={-130}
    >
      <Title>Welcome Back 😄</Title>

      <TextField
        onChangeText={setIdentifier}
        value={identifier}
        placeholder={"Username or Email"}
        autoComplete="username"
        inputMode="email"
      />

      <TextField
        onChangeText={setPassword}
        value={password}
        placeholder={"Password"}
        autoComplete="current-password"
      />

      <Error>{error}</Error>

      <SubmitButton onPress={onLoginCallback}>Login</SubmitButton>

      <NavigationLink onPress={() => navigation.navigate("Register")}>
        Don't have an account yet?
      </NavigationLink>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;

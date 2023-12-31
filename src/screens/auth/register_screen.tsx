import React, { useState, FC, useContext } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";

import validators from "../../utils/validators";
import Title from "../../components/auth/Title.tsx";
import TextField from "../../components/auth/TextField.tsx";
import Error from "../../components/Error.tsx";
import SubmitButton from "../../components/Buttons/SubmitButton.tsx";
import NavigationLink from "../../components/auth/NavigationLink.tsx";
import theme from "../../core/theme.ts";
import ButtonContainer from "../../components/Buttons/ButtonContainer.tsx";
import LoadingLottie from "../../components/LoadingLottie.tsx";

const RegisterScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { register, login, isLoading } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string>();

  const onRegisterCallback = async () => {
    let err: string | undefined;
    err = validators.usernameValidator(username);
    if (!err) err = validators.emailValidator(email);
    if (!err) err = validators.strongPasswordValidator(password);
    if (!err && password != repeatPassword) err = "passwords don't match";
    if (!err) {
      const res = await register({
        username: username,
        email: email,
        password: password,
      });
      err = res as string | undefined;
    }
    if (!err) {
      const res = await login({
        identifier: username,
        password: password,
      });
      err = res as string | undefined;
    }
    setError(err);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-70}
    >
      <Title>Nice to meet you 🥹</Title>

      <TextField
        onChangeText={setUsername}
        value={username}
        placeholder={"Username"}
      />

      <TextField
        onChangeText={setEmail}
        value={email}
        placeholder={"Email"}
        autoComplete="email"
        inputMode="email"
      />

      <TextField
        onChangeText={setPassword}
        value={password}
        placeholder={"Password"}
        autoComplete="current-password"
      />

      <TextField
        onChangeText={setRepeatPassword}
        value={repeatPassword}
        placeholder={"Repeat Password"}
        autoComplete="current-password"
      />

      <Error>{error}</Error>

      <ButtonContainer>
        <SubmitButton onPress={onRegisterCallback} disabled={isLoading}>
          Register
        </SubmitButton>
      </ButtonContainer>

      <NavigationLink onPress={() => navigation.navigate("Login")}>
        Already have an account?
      </NavigationLink>
      {isLoading && <LoadingLottie />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
});

export default RegisterScreen;

import React, { useState, FC, useContext } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";

import validators from "../../utils/validators.ts";
import Title from "../../components/auth/Title.tsx";
import TextField from "../../components/auth/TextField.tsx";
import Error from "../../components/Error.tsx";
import SubmitButton from "../Buttons/SubmitButton.tsx";
import NavigationLink from "../../components/auth/NavigationLink.tsx";
import LottieView from "lottie-react-native";
import theme from "../../core/theme.ts";
import ButtonContainer from "../Buttons/ButtonContainer.tsx";

const ProfileArea: FC<{ isLoading: boolean }> = () => {
  const { authData, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState(authData?.username);
  const [email, setEmail] = useState(authData?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>();

  const onSaveCallback = async () => {
    let err: string | undefined;
    err = validators.usernameValidator(username as string);
    if (!err) err = validators.emailValidator(email as string);
    if (!err) err = validators.strongPasswordValidator(newPassword);
    setError(err);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* 
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

      <SubmitButton onPress={onRegisterCallback}>Register</SubmitButton> */}
      <ButtonContainer>
        <SubmitButton onPress={async () => logout()}>Logout</SubmitButton>
      </ButtonContainer>
      {isLoading && (
        <LottieView
          style={styles.loading}
          source={require("../../assets/loading.json")}
          autoPlay
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ProfileArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  loading: {
    width: 100,
    height: 100,
    marginTop: -15,
  },
});

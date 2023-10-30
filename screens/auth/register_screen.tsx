import { useState, FC, useContext } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import validators from "../../utils/validators";
import NavigationLink from "../../components/auth/NavigationLink";
import SubmitButton from "../../components/auth/SubmitButton";
import Error from "../../components/auth/Error";
import TextField from "../../components/auth/TextField";

const RegisterScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { register, login, isLoading } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string>();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(showPassword ? false : true);

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
    >
      <Header>Nice to meet you 🥹</Header>

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

      <SubmitButton onPress={onRegisterCallback}>Register</SubmitButton>

      <NavigationLink onPress={() => navigation.navigate("Login")}>
        Already have an account?
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

export default RegisterScreen;

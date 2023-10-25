import { useState, FC, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../../core/theme";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import validators from "../../utils/validators";

// import StudentModel, { Student } from '../model/StudentModel';
// import * as ImagePicker from 'expo-image-picker';

const RegisterScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { register, login } = useContext(AuthContext);

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
    >
      <Header>Nice to meet you 🥹</Header>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder={"Username"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder={"Email"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={"Password"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setRepeatPassword}
        value={repeatPassword}
        placeholder={"Repeat Password"}
      />
      {error && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      <View style={styles.buttonesContainer}>
        {/* <TouchableOpacity onPress={onCancellCallback} style={styles.button}>
                        <Text style={styles.buttonText}>CANCELL</Text>
                    </TouchableOpacity> */}
        <TouchableOpacity onPress={onRegisterCallback} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.navigationButton}
      >
        <Text style={styles.navigationText}>Already have an account?</Text>
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
  input: {
    width: "75%",
    height: 50,
    margin: 11,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
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
    margin: 12,
  },
  navigationText: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
});

export default RegisterScreen;

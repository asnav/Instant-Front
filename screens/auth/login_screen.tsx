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

  const onLoginCallback = async () => {
    if ( identifier == "" ) return setError("Username or Email missing.");
    if ( password == "" ) return setError("Password missing.");
    const res = await login({ identifier: identifier, password: password });
    setError(res as string | undefined);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header>Welcome Back 😄</Header>
      <TextInput
        style={styles.input}
        onChangeText={setIdentifier}
        value={identifier}
        placeholder={"Username or Email"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={"Password"}
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

export default LoginScreen;

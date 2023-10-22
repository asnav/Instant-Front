import React, { FC } from "react";
import { Button, Text, View } from "react-native";

const RegisterScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register!</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;

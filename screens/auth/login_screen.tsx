import React, { FC } from "react";
import { Button, Text, View } from "react-native";

const LoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login!</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;

import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../../screens/auth/register_screen.tsx";
import LoginScreen from "../../screens/auth/login_screen.tsx";

const Stack = createNativeStackNavigator();
const AuthNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;

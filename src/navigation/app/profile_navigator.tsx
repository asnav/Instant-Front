import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../../screens/profile/profile_screen.tsx";
import UpdateScreen from "../../screens/profile/update_post_screen.tsx";

const Stack = createNativeStackNavigator();

const ProfileNavigator: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdatePost"
        component={UpdateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

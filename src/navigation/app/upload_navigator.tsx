import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UploadScreen from "../../screens/upload/upload_screen.tsx";

const Stack = createNativeStackNavigator();

const UploadNavigator: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UploadScreen" component={UploadScreen} />
    </Stack.Navigator>
  );
};

export default UploadNavigator;

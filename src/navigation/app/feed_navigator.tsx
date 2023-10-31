import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedScreen from "../../screens/feed/feed_screen.tsx";

const Stack = createNativeStackNavigator();

const FeedNavigator: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;

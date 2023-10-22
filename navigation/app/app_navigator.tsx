import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FeedNavigator from "./feed_navigator.tsx";
import UploadNavigator from "./upload_navigator.tsx";
import ChatNavigator from "./chat_navigator.tsx";
import ProfileNavigator from "./profile_navigator.tsx";

const Tab = createBottomTabNavigator();
const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "key";
            if (route.name === "Feed")
              iconName = focused ? "ios-home" : "ios-home-outline";
            else if (route.name === "Upload")
              iconName = focused ? "add-circle" : "add-circle-outline";
            else if (route.name === "Chats")
              iconName = focused ? "ios-chatbubble" : "ios-chatbubble-outline";
            else if (route.name === "Profile")
              iconName = focused ? "ios-person" : "ios-person-outline";

            return (
              <Ionicons
                name={iconName}
                size={focused ? size + 1 : size - 1}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#e6464e",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Feed" component={FeedNavigator} />
        <Tab.Screen name="Upload" component={UploadNavigator} />
        <Tab.Screen name="Chats" component={ChatNavigator} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

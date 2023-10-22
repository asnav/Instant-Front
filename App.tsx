import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import FeedNavigator from "./navigators/feed_navigator.tsx";
import UploadNavigator from "./navigators/upload_navigator.tsx";
import ChatNavigator from "./navigators/chat_navigator.tsx";
import ProfileNavigator from "./navigators/profile_navigator.tsx";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === "Feed") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Upload") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Chats") {
              iconName = focused ? "ios-chatbubble" : "ios-chatbubble-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }
            // You can return any component that you like here!
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
}

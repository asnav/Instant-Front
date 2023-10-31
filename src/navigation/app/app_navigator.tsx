import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FeedNavigator from "./feed_navigator.tsx";
import UploadNavigator from "./upload_navigator.tsx";
import ProfileNavigator from "./profile_navigator.tsx";
import ChatScreen from "../../screens/chat/chat_screen.tsx";
import ChatsScreen from "../../screens/chat/chats_screen.tsx";

const Stack = createNativeStackNavigator();
const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator: FC = () => {
  return (
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
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: true, headerTitleStyle: { fontSize: 20 } }}
      />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

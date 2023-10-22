import React, { FC } from "react";
import { Button, Text, View } from "react-native";

const ProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
};

export default ProfileScreen;

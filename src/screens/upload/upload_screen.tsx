import React, { FC } from "react";
import { Button, Text, View } from "react-native";

const UploadScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Upload!</Text>
    </View>
  );
};

export default UploadScreen;

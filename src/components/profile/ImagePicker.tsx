import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";

import theme from "../../core/theme.ts";

const ImagePicker = (props: { imageUri: string; setImageUri: any }) => {
  const imagePicker = async () => {
    try {
      const res = await launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        props.setImageUri(uri);
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };

  return (
    <TouchableOpacity onPress={imagePicker}>
      <Image
        defaultSource={require("../../assets/headshot.png")}
        source={{ uri: props.imageUri }}
        style={styles.profilePicture}
      />
    </TouchableOpacity>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

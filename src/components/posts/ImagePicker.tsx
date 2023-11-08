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
      {props.imageUri ? (
        <Image style={styles.image} source={{ uri: props.imageUri }} />
      ) : (
        <View style={styles.image}>
          <Text style={styles.imagePickerText}>Tap to choose a photo</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  image: {
    backgroundColor: theme.colors.grey,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    marginTop: 30,
    height: "auto",
    width: "100%",
  },
  imagePickerText: {
    color: theme.colors.secondaryText,
    fontWeight: "bold",
    fontSize: 20,
  },
});

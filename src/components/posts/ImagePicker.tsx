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
    <>
      {props.imageUri ? (
        <TouchableOpacity onPress={imagePicker}>
          <Image style={styles.image} source={{ uri: props.imageUri }} />
        </TouchableOpacity>
      ) : (
        <View style={styles.image}>
          <TouchableOpacity onPress={imagePicker}>
            <Text style={styles.imagePickerText}>Tap to choose a photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    marginTop: 30,
    backgroundColor: theme.colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePickerText: {
    padding: "50%",
    width: "100%",
    fontSize: 20,
    color: theme.colors.secondaryText,
    fontWeight: "bold",
  },
});

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { launchImageLibraryAsync } from "expo-image-picker";

const ImagePicker = (props: { imageUri: string; setImageUri: any }) => {
  const imagePicker = async () => {
    try {
      const res = await launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        props.setImageUri(uri);
        await Image.clearMemoryCache();
      }
    } catch (err) {
      console.log("open camera error:" + err);
    }
  };

  return (
    <TouchableOpacity onPress={imagePicker}>
      <Image
        placeholder={require("../../assets/headshot.png")}
        placeholderContentFit="contain"
        source={{ uri: props.imageUri }}
        cachePolicy={"memory"}
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

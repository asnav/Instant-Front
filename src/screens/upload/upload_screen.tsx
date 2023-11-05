import React, { FC, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInput } from "react-native";
import TabTitle from "../../components/TabTitle.tsx";
import requestPermission from "../../utils/requestPermission";
import SubmitButton from "../../components/SubmitButton.tsx";
import Error from "../../components/Error.tsx";
import fileApi from "../../api/fileApi.ts";
import theme from "../../core/theme.ts";
import ImagePicker from "../../components/posts/ImagePicker.tsx";

const UploadScreen: FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const [imageUri, setImageUri] = useState("");
  const [error, setError] = useState<string>();

  const uploadPost = async () => {
    if (imageUri) {
      await fileApi.upload(imageUri);
      setImageUri("");
      navigation.navigate("Feed");
    } else setError("Text is BORING!\nadd a photo to make it pop.");
  };

  return (
    <View style={styles.container}>
      <TabTitle>Upload</TabTitle>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
        <TextInput style={styles.description} placeholder="Description" />
        <SubmitButton onPress={uploadPost}>Upload</SubmitButton>
        <Error>{error}</Error>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },

  description: {
    backgroundColor: theme.colors.secondary,
    fontSize: 15,
    color: theme.colors.text,
    borderWidth: 0,
  },
});

import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { uploadPost } from "../../models/Post.ts";
import TabTitle from "../../components/TabTitle.tsx";
import requestPermission from "../../utils/requestPermission";
import SubmitButton from "../../components/Buttons/SubmitButton.tsx";
import Error from "../../components/Error.tsx";
import theme from "../../core/theme.ts";
import ImagePicker from "../../components/posts/ImagePicker.tsx";
import ButtonContainer from "../../components/Buttons/ButtonContainer.tsx";
import LottieView from "lottie-react-native";

const UploadScreen: FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>();
  const [enableScrolling, setEnableScrolling] = useState(false);

  const onSubmit = async () => {
    try {
      if (imageUri && description) {
        setIsLoading(true);
        await uploadPost(imageUri, description);
        setImageUri("");
        setDescription("");
        setError(undefined);
        setIsLoading(false);
        navigation.navigate("Feed");
      } else if (!imageUri)
        setError("Text is BORING!\nadd a photo to make it pop.");
      else setError("dont you have anything to say about it?");
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TabTitle>Upload</TabTitle>
      <KeyboardAwareScrollView
        scrollEnabled={enableScrolling}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
        <TextInput
          style={styles.description}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          editable={!isLoading}
          onFocus={() => setEnableScrolling(true)}
          onBlur={() => setEnableScrolling(false)}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically
          multiline
        />

        <ButtonContainer>
          <SubmitButton
            onPress={onSubmit}
            disabled={isLoading || (!imageUri && !description)}
          >
            Upload
          </SubmitButton>
        </ButtonContainer>
        <Error>{error}</Error>
      </KeyboardAwareScrollView>
      {isLoading && (
        <View style={styles.animation_container}>
          <LottieView
            style={styles.loading}
            source={require("../../assets/loading.json")}
            autoPlay
          />
        </View>
      )}
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
    width: "95%",
    height: 100,
    marginVertical: 10,
    marginHorizontal: "2.5%",
    paddingLeft: 10,
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: 17,
  },
  animation_container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    width: 200,
    position: "absolute",
  },
});

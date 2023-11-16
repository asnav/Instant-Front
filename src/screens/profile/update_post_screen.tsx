import React, { FC, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Post,
  deletePost,
  updatePostText,
  updatePostImage,
} from "../../models/Post.ts";
import requestPermission from "../../utils/requestPermission";
import SubmitButton from "../../components/Buttons/SubmitButton.tsx";
import Error from "../../components/Error.tsx";
import theme from "../../core/theme.ts";
import ImagePicker from "../../components/posts/ImagePicker.tsx";
import { baseURL } from "../../constants/constants.ts";
import { Ionicons } from "@expo/vector-icons";
import ButtonContainer from "../../components/Buttons/ButtonContainer.tsx";
import ButtonSpacer from "../../components/Buttons/ButtonSpacer.tsx";

const UpdateScreen: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const post: Post = route.params.post;
  const oldImageUri: string = baseURL + "/uploads/" + post.postId + ".jpg";

  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(oldImageUri);
  const [description, setDescription] = useState(post.text);
  const [error, setError] = useState<string>();
  const [enableScrolling, setEnableScrolling] = useState(false);

  const onSubmit = async () => {
    try {
      if (imageUri && description) {
        setIsLoading(true);
        if (post.text != description)
          await updatePostText(post.postId, description);
        if (imageUri != oldImageUri)
          await updatePostImage(post.postId, imageUri);
        navigation.goBack();
      } else if (!imageUri)
        setError("Text is BORING!\nadd a photo to make it pop.");
      else setError("dont you have anything to say about it?");
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deletePost(post.postId);
      navigation.goBack();
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update</Text>
      <TouchableOpacity style={styles.back} onPress={navigation.goBack}>
        <Ionicons name={"chevron-back-outline"} size={35} color="black" />
      </TouchableOpacity>
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
            disabled={
              isLoading || (post.text == description && imageUri == oldImageUri)
            }
          >
            Update
          </SubmitButton>
          <ButtonSpacer />
          <SubmitButton
            style={{ backgroundColor: theme.colors.error }}
            onPress={onDelete}
            disabled={isLoading || (!imageUri && !description)}
          >
            Delete
          </SubmitButton>
        </ButtonContainer>
        <Error>{error}</Error>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  back: {
    position: "absolute",
    height: 40,
    width: 40,
    marginLeft: 10,
    marginTop: 50,
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginTop: 50,
    fontSize: 33,
    color: theme.colors.text,
    fontWeight: "bold",
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
});

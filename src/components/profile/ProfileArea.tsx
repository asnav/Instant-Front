import React, { useState, useContext, FC } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Image } from "expo-image";

import { AuthContext } from "../../context/AuthContext.tsx";
import { baseURL } from "../../constants/constants.ts";

import theme from "../../core/theme.ts";
import ButtonContainer from "../Buttons/ButtonContainer.tsx";
import ButtonSpacer from "../Buttons/ButtonSpacer.tsx";
import SubmitButton from "../Buttons/SubmitButton.tsx";
import ImagePicker from "./ImagePicker.tsx";
import Error from "../../components/Error.tsx";

import { updatePostImage } from "../../models/Post.ts";

const ProfileArea: FC<{ isLoading: boolean; setIsLoading: Function }> = ({
  isLoading,
  setIsLoading,
}) => {
  const { authData, changeUsername, changeEmail, changePassword, logout } =
    useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const imageUri: string = baseURL + "/uploads/" + authData?.userId + ".jpg";
  const [localImageUri, setLocalImageUri] = useState(imageUri);
  const [username, setUsername] = useState(authData?.username);
  const [email, setEmail] = useState(authData?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>();

  const onSubmitEditing = async () => {
    setIsLoading(true);
    let err: string | undefined;
    if (username != authData?.username)
      err = (await changeUsername(username as string)) as string | undefined;
    if (!err && email != authData?.email)
      err = (await changeEmail(email as string)) as string | undefined;
    if (!err && newPassword != "")
      err = (await changePassword(oldPassword, newPassword)) as
        | string
        | undefined;
    if (!err && imageUri != localImageUri)
      err = (await updatePostImage(
        authData?.userId as string,
        localImageUri
      )) as string | undefined;
    setError(err);
    setIsLoading(false);
    if (!err) {
      setEditMode(false);
      await Image.clearMemoryCache();
      setLocalImageUri(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileArea}>
        {!editMode ? (
          <>
            <Image
              placeholder={require("../../assets/headshot.png")}
              placeholderContentFit="contain"
              source={{ uri: imageUri }}
              cachePolicy={"memory"}
              style={styles.profilePicture}
            />
            <View style={styles.details}>
              <Text style={styles.text}>{authData?.username}</Text>
              <Text style={styles.text}>{authData?.email}</Text>
            </View>
          </>
        ) : (
          <>
            <ImagePicker
              imageUri={localImageUri}
              setImageUri={setLocalImageUri}
            />
            <View style={styles.details}>
              <TextInput
                style={styles.field}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                editable={!isLoading}
                enablesReturnKeyAutomatically
              />
              <TextInput
                style={styles.field}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
                enablesReturnKeyAutomatically
              />
              <TextInput
                style={styles.field}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                editable={!isLoading}
                enablesReturnKeyAutomatically
              />
              <TextInput
                style={styles.field}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!isLoading}
                enablesReturnKeyAutomatically
              />
            </View>
          </>
        )}
      </View>
      {editMode && <Error>{error}</Error>}
      <ButtonContainer>
        {editMode && (
          <>
            <SubmitButton
              onPress={() => setEditMode(false)}
              disabled={isLoading}
            >
              Cancel
            </SubmitButton>
            <ButtonSpacer />
          </>
        )}
        <SubmitButton
          onPress={() => {
            editMode ? onSubmitEditing() : setEditMode(true);
          }}
          disabled={
            isLoading ||
            (username == authData?.username &&
              email == authData?.email &&
              newPassword == "" &&
              imageUri == localImageUri &&
              editMode)
          }
        >
          {!editMode ? "Edit" : "Done"}
        </SubmitButton>
        {!editMode && (
          <>
            <ButtonSpacer />
            <SubmitButton onPress={async () => logout()} disabled={isLoading}>
              Logout
            </SubmitButton>
          </>
        )}
      </ButtonContainer>
    </View>
  );
};

export default ProfileArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  profileArea: {
    flex: 1,
    flexDirection: "row",
    width: "85%",
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  details: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    paddingLeft: 10,
  },
  field: {
    marginVertical: 5,
    padding: 5,
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: 17,
  },
  text: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "bold",
  },
});

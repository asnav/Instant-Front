import React, { useState, useContext } from "react";
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
import LottieView from "lottie-react-native";

import { updatePostImage } from "../../models/Post.ts";
import { ApiResponse } from "apisauce";

const ProfileArea = () => {
  const { authData, changeUsername, changeEmail, changePassword, logout } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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
      await updatePostImage(authData?.userId as string, localImageUri);
    setError(err);
    setIsLoading(false);
    if (!err) setEditMode(false);
  };

  return (
    <View style={styles.container}>
      {/* Profile Details */}
      <View style={styles.profileArea}>
        {!editMode ? (
          <>
            <Image
              placeholder={require("../../assets/headshot.png")}
              placeholderContentFit="contain"
              source={{ uri: imageUri }}
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

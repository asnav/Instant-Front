import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, TextInput, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";
import { baseURL } from "../../constants/constants.ts";

import theme from "../../core/theme.ts";
import ButtonContainer from "../Buttons/ButtonContainer.tsx";
import ButtonSpacer from "../Buttons/ButtonSpacer.tsx";
import SubmitButton from "../Buttons/SubmitButton.tsx";
import ImagePicker from "./ImagePicker.tsx";
import Error from "../../components/Error.tsx";

import authApi from "../../api/authApi.ts";
import { updatePostImage } from "../../models/Post.ts";
const ProfileArea = (props: { isLoading: boolean; setIsLoading: Function }) => {
  const { logout, authData } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const imageUri: string = baseURL + "/uploads/" + authData?.userId + ".jpg";
  const [localImageUri, setLocalImageUri] = useState(imageUri);
  const [username, setUsername] = useState(authData?.username);
  const [email, setEmail] = useState(authData?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>();

  const onSubmitEditing = () => {
    username != authData?.username &&
      authApi.changeUsername(username as string);
    email != authData?.email && authApi.changeEmail(email as string);
    newPassword != "" && authApi.changePassword(oldPassword, newPassword);
    imageUri != localImageUri &&
      updatePostImage(authData?.userId as string, localImageUri);
  };

  return (
    <View style={styles.container}>
      {/* Profile Details */}
      <View style={styles.profileArea}>
        {!editMode ? (
          <>
            <Image
              defaultSource={require("../../assets/headshot.png")}
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
                editable={!props.isLoading}
                enablesReturnKeyAutomatically
              />
              <TextInput
                style={styles.field}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                editable={!props.isLoading}
                enablesReturnKeyAutomatically
              />
              <TextInput
                style={styles.field}
                placeholder="Update Password"
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!props.isLoading}
                enablesReturnKeyAutomatically
              />
              <TextInput
                style={styles.field}
                placeholder="Repeat Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                editable={!props.isLoading}
                enablesReturnKeyAutomatically
              />
              <Error>{error}</Error>
            </View>
          </>
        )}
      </View>
      <ButtonContainer>
        <SubmitButton
          onPress={() => {
            setEditMode(!editMode);
            editMode && onSubmitEditing();
          }}
        >
          {!editMode ? "Edit" : "Done"}
        </SubmitButton>
        {!editMode && (
          <>
            <ButtonSpacer />
            <SubmitButton
              onPress={async () => logout()}
              disabled={props.isLoading}
            >
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

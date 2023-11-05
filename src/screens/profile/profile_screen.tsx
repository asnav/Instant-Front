import React, { FC, useContext } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext.tsx";
import TabTitle from "../../components/TabTitle.tsx";
import theme from "../../core/theme.ts";

const ProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TabTitle>Profile</TabTitle>
      <TouchableOpacity
        onPress={async () => logout()}
        style={styles.navigationButton}
      >
        <Text style={styles.navigationText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  navigationButton: {
    padding: 12,
    paddingBottom: 16,
  },
  navigationText: {
    color: theme.colors.secondaryText,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

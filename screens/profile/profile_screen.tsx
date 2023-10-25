import React, { FC, useContext } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import theme from "../../core/theme";
import { AuthContext } from "../../context/AuthContext";

const ProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  navigationButton: {
    margin: 12,
  },
  navigationText: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

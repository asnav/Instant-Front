import React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import theme from "../../core/theme";

const { width, height } = Image.resolveAssetSource(
  require("../../assets/cart.png")
);
const aspectRatio = height / width;

export default function Post() {
  return (
    <View style={styles.container}>
      <View style={styles.ownerContainer}>
        <Image
          source={require("../../assets/headshot.png")}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>username</Text>
      </View>
      <Image
        source={require("../../assets/cart.png")}
        style={[
          styles.image,
          { height: Dimensions.get("window").width * aspectRatio },
        ]}
      />
      <Text style={styles.text}>The post's caption</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    width: "100%",
    paddingVertical: 5,
  },
  text: {
    padding: 15,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5,
  },
  username: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

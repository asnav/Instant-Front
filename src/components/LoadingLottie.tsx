import { StyleSheet, View, Text, TextProps } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingLottie() {
  return (
    <View style={styles.animation_container}>
      <LottieView
        style={styles.loading}
        source={require("../assets/loading.json")}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

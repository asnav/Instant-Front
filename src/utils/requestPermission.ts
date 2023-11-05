import * as ImagePicker from "expo-image-picker";

const requestPermission = async () => {
  const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!res.granted) {
    alert(
      "Instant needs your permission to access the library, please go to settings to allow it."
    );
  }
};

export default requestPermission;

import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { launchCameraAsync } from "expo-image-picker";
import { useState } from "react";

export default function ImagePicker() {
  const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);

  const takeImageHandler = async () => {
    console.log("take image");
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImageUri(image.assets ? image.assets[0].uri : null);
  };

  let imagePreview = <Text variant="labelSmall">No image picked yet.</Text>;

  if (pickedImageUri) {
    imagePreview = (
      <Image source={{ uri: pickedImageUri }} style={styles.image} />
    );
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button mode="contained" onPress={takeImageHandler} icon="camera">
        Take Image
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
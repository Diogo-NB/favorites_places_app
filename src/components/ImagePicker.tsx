import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { launchCameraAsync } from "expo-image-picker";
import { memo, useEffect, useState } from "react";
import { useCameraPermission } from "../util/permissions";

interface ImagePickerProps {
  onImageTaken: (imageUri: string) => void;
}

export function ImagePicker({ onImageTaken }: ImagePickerProps) {
  const [pickedImageUri, setPickedImageUri] = useState<string | null>(null);
  const hasPermission = useCameraPermission();

  const takeImageHandler = async () => {
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImageUri(image.assets ? image.assets[0].uri : null);
  };

  useEffect(() => {
    if (pickedImageUri) {
      onImageTaken(pickedImageUri);
    }
  }, [pickedImageUri, onImageTaken]);

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

export default memo(ImagePicker);

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useForegroundPermissions } from "expo-location";

export function useCameraPermission() {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      if (cameraPermission?.status === PermissionStatus.GRANTED) {
        setHasPermission(true);
      } else if (cameraPermission?.status === PermissionStatus.DENIED) {
        setHasPermission(false);
      } else {
        const permissionResponse = await requestPermission();
        if (permissionResponse.status === PermissionStatus.GRANTED) {
          setHasPermission(true);
        } else {
          Alert.alert(
            "Insufficient permissions!",
            "You need to grant camera permissions to use this app.",
            [{ text: "Okay" }]
          );
          setHasPermission(false);
        }
      }
    };

    checkPermission();
  }, [cameraPermission, requestPermission]);

  return hasPermission;
}

export function useLocationPermission() {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      if (locationPermission?.status === PermissionStatus.GRANTED) {
        setHasPermission(true);
      } else if (locationPermission?.status === PermissionStatus.DENIED) {
        setHasPermission(false);
      } else {
        const permissionResponse = await requestPermission();
        if (permissionResponse.status === PermissionStatus.GRANTED) {
          setHasPermission(true);
        } else {
          Alert.alert(
            "Insufficient permissions!",
            "You need to grant location permissions to use this app.",
            [{ text: "Okay" }]
          );
          setHasPermission(false);
        }
      }
    };

    checkPermission();
  }, [locationPermission, requestPermission]);

  return hasPermission;
}

export default function usePermissions() {
  const cameraPermission = useCameraPermission();
  const locationPermission = useLocationPermission();

  return cameraPermission && locationPermission;
}

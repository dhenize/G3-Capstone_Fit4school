// components/ar_com/cam_with_tensors.jsx

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";

export default function CameraWithTensors({
  onCameraReady,
  style,
  facing = "back",
  getCameraRef,
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await tf.ready();
    })();
  }, []);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleCameraReady = () => {
    setIsReady(true);
    if (onCameraReady) onCameraReady();
    if (getCameraRef) {
      getCameraRef({
        takePictureAsync: async (opts = {}) => {
          if (!cameraRef.current) throw new Error("Camera not mounted");

          const photo = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0.8,
            skipProcessing: true,
            ...opts,
          });
          return photo;
        },
        photoToTensor: async (base64) => {
          let b64 = base64;
          if (b64.startsWith("data:")) {
            b64 = b64.split(",")[1];
          }
          const raw = tf.util.encodeString(b64, "base64").buffer;
          const u8 = new Uint8Array(raw);

          const imageTensor = decodeJpeg(u8);
          return imageTensor;
        },
      });
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        {" "}
        <Text>Requesting camera permission...</Text>{" "}
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        {" "}
        <Text>No access to camera</Text>{" "}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {" "}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onCameraReady={handleCameraReady}
      />
      {isReady && (
        <View style={styles.debugBadge}>
          <Text style={{ fontSize: 12 }}>Back Camera Running</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  debugBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.75)",
    padding: 4,
    borderRadius: 4,
  },
});

// components/ar_com/camera_with_tensors.jsx
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as tf from '@tensorflow/tfjs';

export default function CameraWithTensors({
  onFrame,
  onCameraReady,
  style,
  facing = 'back'
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const frameProcessor = useRef(null);
  const processing = useRef(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleCameraReady = () => {
    setIsReady(true);
    if (onCameraReady) onCameraReady();
  };

  // Function to process frames without blocking the UI
  const processFrame = async () => {
    if (processing.current || !onFrame) return;
    
    processing.current = true;
    try {
      // Simulate frame processing (replace with actual tensor processing)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create a mock tensor for testing
      const mockTensor = tf.ones([200, 152, 3]);
      onFrame(mockTensor);
      
      // Dispose the tensor to prevent memory leaks
      setTimeout(() => {
        if (mockTensor && !mockTensor.isDisposed) {
          mockTensor.dispose();
        }
      }, 100);
    } catch (error) {
      console.error('Error processing frame:', error);
    } finally {
      processing.current = false;
    }
  };

  // Set up frame processing at a controlled rate
  useEffect(() => {
    if (isReady && onFrame) {
      const interval = setInterval(processFrame, 300); // Process every 300ms
      return () => clearInterval(interval);
    }
  }, [isReady, onFrame]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onCameraReady={handleCameraReady}
        // Remove onFrameAvailable to prevent freezing
      />
      
      {isReady && (
        <View style={styles.debugBadge}>
          <Text>Back Camera Running</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  debugBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.75)",
    padding: 4,
    borderRadius: 4,
  },
});
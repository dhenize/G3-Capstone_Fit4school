// app/ar_mod/ar_calc.jsx
import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text } from "../../components/globalText";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as tf from "@tensorflow/tfjs";
import CameraWithTensors from "../../components/ar_com/cam_with_tensors";
import SilhouetteOverlay from "../../components/ar_com/silhouette_overlay";


export default function ArCalc() {

  const router = useRouter();
  const params = useLocalSearchParams();
  const { height: hParam, unit: unitParam, gender } = params;

  const [status, setStatus] = useState("prepare");
  const [scanPhase, setScanPhase] = useState("front");
  const [cameraReady, setCameraReady] = useState(false);
  const [personDetected, setPersonDetected] = useState(false);
  const framesRef = useRef([]);
  const scanTimerRef = useRef(null);
  const detectionTimerRef = useRef(null);
  const MAX_FRAMES = 15;
  const SCAN_TIMEOUT_MS = 10000; // 10 seconds
  const DETECTION_TIMEOUT_MS = 3000; // 3 seconds to detect a person

  function parseHeightToCm(h, unit) {
    if (!h) return null;
    if (unit === "cm" || String(h).toLowerCase().includes("cm")) {
      const n = parseFloat(String(h).replace(/[^\d.]/g, ""));
      return isNaN(n) ? null : n;
    }

    const s = String(h).replace(/[^\d.]/g, "");
    const n = parseFloat(s);
    if (isNaN(n)) return null;
    return n * 30.48; // ft -> cm
  }

  const userHeightCm = parseHeightToCm(hParam, unitParam);

  useEffect(() => {
    if (status === "prepare" && cameraReady) {
      setStatus("waiting");
      setPersonDetected(false);
      
      // Set timeout for person detection
      detectionTimerRef.current = setTimeout(() => {
        if (!personDetected) {
          setStatus("noPerson");
        }
      }, DETECTION_TIMEOUT_MS);
      
      return () => {
        if (detectionTimerRef.current) {
          clearTimeout(detectionTimerRef.current);
        }
      };
    }
  }, [status, cameraReady]);

  useEffect(() => {
    if (status === "scanning") {
      // Start scan timer
      scanTimerRef.current = setTimeout(() => {
        handleFinishScan();
      }, SCAN_TIMEOUT_MS);
      
      return () => {
        if (scanTimerRef.current) {
          clearTimeout(scanTimerRef.current);
        }
      };
    }
  }, [status]);

  // Simulate person detection (replace with actual detection logic)
  const detectPerson = (tensor) => {
    return tf.tidy(() => {
      // Simple simulation - in a real app, you would use pose detection
      // For now, we'll simulate detection with a random value
      const detectionScore = Math.random();
      return detectionScore > 0.3; // 70% chance of detection
    });
  };

  const estimatePersonWidthPx = (tensor) => {
    return tf.tidy(() => {
      // Simulate measurement based on detection
      const baseWidth = 80;
      const variation = 20;
      return baseWidth + (Math.random() * variation);
    });
  };

  function pxToCm(pxWidth, tensorHeightPx = 200, userHeightCmInput) {
    if (!userHeightCmInput || pxWidth <= 0) return null;
    const cmPerPx = userHeightCmInput / tensorHeightPx;
    return pxWidth * cmPerPx;
  }

  const sizeChart = [
    { size: "XS", chestIn: 17 },
    { size: "S", chestIn: 18 },
    { size: "M", chestIn: 19 },
    { size: "L", chestIn: 20 },
    { size: "XL", chestIn: 21 },
    { size: "2XL", chestIn: 22 },
    { size: "3XL", chestIn: 23.5 },
    { size: "4XL", chestIn: 25.5 },
  ];

  function inchesToCm(inch) {
    return inch * 2.54;
  }

  function findBestSize(chestCm) {
    if (!chestCm) return "Unknown";
    let best = sizeChart[0];
    let bestDiff = Math.abs(chestCm - inchesToCm(best.chestIn));
    for (const entry of sizeChart) {
      const diff = Math.abs(chestCm - inchesToCm(entry.chestIn));
      if (diff < bestDiff) {
        best = entry;
        bestDiff = diff;
      }
    }
    return best.size;
  }

  const onFrame = async (tensor) => {
    if (status !== "waiting" && status !== "scanning") return;
    
    try {
      // Detect if a person is present
      const isPersonDetected = detectPerson(tensor);
      
      if (isPersonDetected && status === "waiting") {
        setPersonDetected(true);
        setStatus("scanning");
        if (detectionTimerRef.current) {
          clearTimeout(detectionTimerRef.current);
        }
      }
      
      if (status === "scanning" && isPersonDetected) {
        const pxW = estimatePersonWidthPx(tensor);
        
        framesRef.current.push({ 
          pxWidth: pxW,
          phase: scanPhase
        });

        if (framesRef.current.length >= MAX_FRAMES) {
          if (scanPhase === "front") {
            setScanPhase("side");
            setStatus("prepare");
            framesRef.current = [];
          } else {
            handleFinishScan();
          }
        }
      }
    } catch (e) {
      console.warn("Frame processing error", e);
    }
  };

  const handleFinishScan = () => {
    setStatus("done");
    
    try {
      if (framesRef.current.length === 0) {
        // No frames collected, show error
        router.push({
          pathname: "/ar_mod/ar_result",
          params: {
            size: "Unknown",
            chestCm: "N/A",
            userHeightCm: userHeightCm || "N/A",
            gender: gender || "N/A",
          },
        });
        return;
      }
      
      // Calculate average measurements
      const frontMeasurements = framesRef.current.filter(f => f.phase === "front");
      const sideMeasurements = framesRef.current.filter(f => f.phase === "side");
      
      const avgFront = frontMeasurements.reduce((sum, f) => sum + f.pxWidth, 0) / frontMeasurements.length;
      const avgSide = sideMeasurements.reduce((sum, f) => sum + f.pxWidth, 0) / sideMeasurements.length;
      
      const tensorHeightPx = 200; 
      const chestCm = pxToCm(avgFront, tensorHeightPx, userHeightCm);
      
      // Adjust size based on gender if needed
      const predictedSize = findBestSize(chestCm);

      router.push({
        pathname: "/ar_mod/ar_result",
        params: {
          size: predictedSize,
          chestCm: chestCm ? chestCm.toFixed(1) : "N/A",
          userHeightCm: userHeightCm ? Math.round(userHeightCm) : "N/A",
          gender: gender || "N/A",
        },
      });
    } catch (err) {
      console.error("Finish error", err);
      router.push({
        pathname: "/ar_mod/ar_result",
        params: {
          size: "Unknown",
          chestCm: "N/A",
          userHeightCm: userHeightCm || "N/A",
          gender,
        },
      });
    }
  };

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const restartScan = () => {
    setStatus("prepare");
    setPersonDetected(false);
    framesRef.current = [];
    
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
    }
    if (detectionTimerRef.current) {
      clearTimeout(detectionTimerRef.current);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Camera View with BACK camera */}
      <View style={StyleSheet.absoluteFill}>
        <CameraWithTensors
          onFrame={onFrame}
          onCameraReady={handleCameraReady}
          facing="back"
        />
        
        {/* Silhouette Overlay */}
        <SilhouetteOverlay 
          type={scanPhase} 
          isActive={status === "scanning"}
        />
      </View>

      {/* UI Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.title}>
          {status === "waiting" 
            ? "Waiting for person detection..." 
            : scanPhase === "front" 
              ? "Position yourself to the front silhouette" 
              : "Now turn sideways to align with the silhouette"}
        </Text>
        
        <Text style={styles.instruction}>
          {status === "waiting" 
            ? "Please stand in front of the camera for scanning"
            : status === "noPerson"
            ? "No person detected. Please stand in front of the camera."
            : scanPhase === "front" 
              ? "Facing the camera — align your body to the outline. Remain still while scanning."
              : "Side view — align your profile to the outline. Remain still while scanning."}
        </Text>

        <View style={styles.scanBox}>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {status === "prepare" && "Preparing camera..."}
            {status === "waiting" && "Waiting for person detection..."}
            {status === "noPerson" && "No person detected. Please try again."}
            {status === "scanning" && `Scanning ${scanPhase} view... please hold still`}
            {status === "done" && "Processing..."}
          </Text>
          
          {status !== "done" && status !== "noPerson" && (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </View>
        
        {status === "noPerson" && (
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={restartScan}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        )}
        
        {status === "prepare" && scanPhase === "side" && (
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleFinishScan}
          >
            <Text style={styles.skipText}>Skip Side Scan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
    backgroundColor: "transparent",
  },
  title: { 
    fontSize: 20, 
    color: "#fff", 
    fontWeight: "700", 
    marginBottom: 8,
    textAlign: "center"
  },
  instruction: { 
    color: "#fff", 
    marginBottom: 12,
    textAlign: "center"
  },
  scanBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  skipButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#61C35C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  skipText: {
    fontWeight: "600",
  },
  retryText: {
    fontWeight: "600",
    color: "white",
  },
});
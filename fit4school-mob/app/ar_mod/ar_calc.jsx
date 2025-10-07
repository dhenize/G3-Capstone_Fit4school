// app/ar_mod/ar_calc.jsx
import React, { useEffect, useRef, useState } from "react";
import {
View,
ActivityIndicator,
StyleSheet,
TouchableOpacity,
Dimensions,
Alert,
Modal,
Text as RNText,
} from "react-native";
import { Text } from "../../components/globalText";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as posedetection from "@tensorflow-models/pose-detection";
import CameraWithTensors from "../../components/ar_com/cam_with_tensors";
import SilhouetteOverlay from "../../components/ar_com/silhouette_overlay";

const { width: screenWidth } = Dimensions.get("window");


export default function ArCalc() {
const router = useRouter();
const params = useLocalSearchParams();
const { height: hParam, unit: unitParam, gender } = params;

// internal states
const [status, setStatus] = useState("prepare"); // prepare | waiting | capturing | analyzing | done | noPerson
const [scanPhase, setScanPhase] = useState("front"); // front | side
const [cameraReady, setCameraReady] = useState(false);
const cameraAPIRef = useRef(null);
const detectorRef = useRef(null);
const [loadingMsg, setLoadingMsg] = useState("");

// parsed user height in cm (nullable)
function parseHeightToCm(h, unit) {
if (!h) return null;
if (unit === "cm" || String(h).toLowerCase().includes("cm")) {
const n = parseFloat(String(h).replace(/[^\d.]/g, ""));
return isNaN(n) ? null : n;
}
// assume feet (like "5.5 ft" or "5.10 ft")
const s = String(h).replace(/[^\d.]/g, "");
const n = parseFloat(s);
if (isNaN(n)) return null;
return n * 30.48;
}
const userHeightCmInput = parseHeightToCm(hParam, unitParam);

// initialize BlazePose detector
useEffect(() => {
let mounted = true;
(async () => {
setLoadingMsg("Initializing TensorFlow...");
await tf.ready();
setLoadingMsg("Loading BlazePose model...");
// create BlazePose detector (tfjs runtime)
try {
detectorRef.current = await posedetection.createDetector(
posedetection.SupportedModels.BlazePose,
{
runtime: "tfjs", // using tfjs-react-native backend
modelType: "full", // options: 'lite'|'full'; choose full for accuracy (heavier)
}
);
} catch (e) {
console.warn("Detector init failed, try MoveNet fallback", e);
// fallback: MoveNet
try {
detectorRef.current = await posedetection.createDetector(
posedetection.SupportedModels.MoveNet,
{ modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
);
} catch (err) {
console.error("Both detectors failed:", err);
}
} finally {
if (mounted) {
setLoadingMsg("");
setStatus("waiting");
}
}
})();
return () => (mounted = false);
}, []);

const handleCameraReady = () => {
setCameraReady(true);
setStatus("waiting");
};

// camera helper will be injected by CameraWithTensors via getCameraRef
const getCameraRef = (api) => {
cameraAPIRef.current = api;
};

// capture-photo -> convert to tensor -> estimate pose -> return poses
const captureAndEstimate = async () => {
if (!cameraAPIRef.current) throw new Error("Camera not ready");
setStatus("capturing");
setLoadingMsg("Capturing photo...");
const photo = await cameraAPIRef.current.takePictureAsync();
if (!photo || !photo.base64) {
throw new Error("Capture failed");
}


setLoadingMsg("Converting image...");
const imgTensor = await cameraAPIRef.current.photoToTensor(photo.base64);
// resize / normalize if needed by model (pose-detection handles many inputs)
setLoadingMsg("Running pose estimation...");
// estimate poses
const poses = await detectorRef.current?.estimatePoses(imgTensor, {
  maxPoses: 1,
  flipHorizontal: false,
});

// dispose tensor
try {
  if (imgTensor && !imgTensor.isDisposedInternal) {
    imgTensor.dispose?.();
  }
} catch (e) {
  // ignore
}

return poses && poses.length > 0 ? poses[0] : null;


};

// Convert keypoints to simple measurements (cm)
// This is a basic approach: we measure pixel distance between landmarks and use userHeightCmInput as scaling reference.
const landmarksToMeasurements = (pose) => {
if (!pose || !pose.keypoints) return null;


// helper: find landmark by name
const kp = (name) => pose.keypoints.find((p) => p.name === name);
const dist = (a, b) => {
  if (!a || !b) return null;
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Typical landmarks for BlazePose: left_shoulder, right_shoulder, left_hip, right_hip, left_knee, right_knee
const leftShoulder = kp("left_shoulder");
const rightShoulder = kp("right_shoulder");
const leftHip = kp("left_hip");
const rightHip = kp("right_hip");
const leftAnkle = kp("left_ankle");
const rightAnkle = kp("right_ankle");
const nose = kp("nose");
const leftKnee = kp("left_knee");
const rightKnee = kp("right_knee");

// estimate pixel height on the image as nose -> ankle average
const midAnkle = leftAnkle && rightAnkle ? { x: (leftAnkle.x + rightAnkle.x) / 2, y: (leftAnkle.y + rightAnkle.y) / 2 } : null;
const pixelHeight = nose && midAnkle ? dist(nose, midAnkle) : null;

// scaling using user's input height (if available)
const pxToCm = (px) => {
  if (!userHeightCmInput || !pixelHeight || pixelHeight <= 0) return null;
  return (px / pixelHeight) * userHeightCmInput;
};

// shoulder width (px distance)
const shoulderPx = dist(leftShoulder, rightShoulder);
const hipPx = dist(leftHip, rightHip);
// leg length = hip -> ankle (use left)
const legPx = leftHip && leftAnkle ? dist(leftHip, leftAnkle) : rightHip && rightAnkle ? dist(rightHip, rightAnkle) : null;
// torso length = shoulder -> hip mid
const midHip = leftHip && rightHip ? { x: (leftHip.x + rightHip.x) / 2, y: (leftHip.y + rightHip.y) / 2 } : null;
const torsoPx = leftShoulder && midHip ? dist(leftShoulder, midHip) : null;

const shoulderCm = pxToCm(shoulderPx);
const hipCm = pxToCm(hipPx);
const legCm = pxToCm(legPx);
const torsoCm = pxToCm(torsoPx);

return {
  shoulderCm: shoulderCm ? Number(shoulderCm.toFixed(1)) : null,
  hipCm: hipCm ? Number(hipCm.toFixed(1)) : null,
  legCm: legCm ? Number(legCm.toFixed(1)) : null,
  torsoCm: torsoCm ? Number(torsoCm.toFixed(1)) : null,
  pixelHeight,
};


};

// Map measurements to top & bottom sizes (basic approach - editable)
// Map measurements to top & bottom sizes (improved for better variation)
const calculateTopBottomSizes = (frontMeasurements, sideMeasurements) => {
  // Use front shoulder/hip, and side for torso/leg confirmation
  const shoulder = frontMeasurements?.shoulderCm ?? sideMeasurements?.shoulderCm;
  const hip = frontMeasurements?.hipCm ?? sideMeasurements?.hipCm;
  const torso = sideMeasurements?.torsoCm ?? frontMeasurements?.torsoCm;
  const leg = sideMeasurements?.legCm ?? frontMeasurements?.legCm;

  // --- TOP SIZE ---
  // Small ~ shoulder < 38 cm, Medium ~ 38–42, Large ~ >42
  let topSize = "Unknown";
  if (shoulder) {
    if (shoulder < 36) topSize = "small";
    else if (shoulder < 41) topSize = "medium";
    else topSize = "large";
  }

  // --- BOTTOM SIZE ---
  // Improve hip detection consistency
  let adjustedHip = hip;
  if (adjustedHip && adjustedHip < 70) adjustedHip *= 1.4; // compensate if hip too small
  if (adjustedHip && adjustedHip > 120) adjustedHip *= 0.9; // trim unrealistically large readings

  // Simple direct thresholds instead of "closest value"
  let bottomSize = "Unknown";
  if (adjustedHip) {
    if (adjustedHip < 82) bottomSize = "size 6";
    else if (adjustedHip < 86) bottomSize = "size 7";
    else if (adjustedHip < 89) bottomSize = "size 8";
    else if (adjustedHip < 92) bottomSize = "size 9";
    else if (adjustedHip < 95) bottomSize = "size 10";
    else if (adjustedHip < 98) bottomSize = "size 11";
    else if (adjustedHip < 101) bottomSize = "size 12";
    else if (adjustedHip < 104) bottomSize = "size 13";
    else bottomSize = "size 14";
  }

  // Return full measurement info
  return {
    topSize,
    bottomSize,
    measurements: { shoulder, hip: adjustedHip, torso, leg },
  };
};



// Capture front or side and proceed
const handleCapturePhase = async () => {
try {
if (!cameraAPIRef.current) {
Alert.alert("Camera not ready", "Please wait for the camera to initialize.");
return;
}
setStatus("capturing");
const pose = await captureAndEstimate();
if (!pose) {
Alert.alert("No pose detected", "Please ensure full body is visible and try again.");
setStatus("waiting");
return;
}
// Convert pose -> measurements
const measures = landmarksToMeasurements(pose);
// store frames: we simply keep last front and side
if (scanPhase === "front") {
// keep front
cameraAPIRef.current._frontMeasures = measures;
setScanPhase("side");
setStatus("waiting");
Alert.alert("Good!", "Front scan saved. Now turn sideways and align with the silhouette.");
} else {
cameraAPIRef.current._sideMeasures = measures;
setStatus("analyzing");
setLoadingMsg("Combining scans and choosing sizes...");
// combine
const front = cameraAPIRef.current._frontMeasures || measures;
const side = cameraAPIRef.current._sideMeasures || measures;
const results = calculateTopBottomSizes(front, side);


    // Send to result: include original height and unit so result page can show correct unit
    router.push({
      pathname: "/ar_mod/ar_result",
      params: {
        topSize: results.topSize,
        bottomSize: results.bottomSize,
        shoulderCm: results.measurements.shoulder ?? "N/A",
        hipCm: results.measurements.hip ?? "N/A",
        torsoCm: results.measurements.torso ?? "N/A",
        legCm: results.measurements.leg ?? "N/A",
        userHeight: hParam || "N/A",
        userUnit: unitParam || "cm",
        gender: gender || "N/A",
      },
    });
  }
} catch (err) {
  console.error("Capture error", err);
  Alert.alert("Capture failed", err.message || "Unknown error");
  setStatus("waiting");
} finally {
  setLoadingMsg("");
}


};

return (
<View style={{ flex: 1, backgroundColor: "black" }}> <View style={StyleSheet.absoluteFill}> <CameraWithTensors
       onCameraReady={handleCameraReady}
       facing="back"
       getCameraRef={getCameraRef}
     />
<SilhouetteOverlay type={scanPhase} isActive={status === "waiting" || status === "capturing"} /> </View>


  <View style={styles.overlay}>
    <Text style={styles.title}>
      {status === "waiting"
        ? scanPhase === "front"
          ? "Position yourself to the front silhouette"
          : "Now turn sideways to align with the silhouette"
        : status === "capturing"
        ? `Capturing ${scanPhase}...`
        : status === "analyzing"
        ? "Analyzing..."
        : "Preparing camera..."}
    </Text>

    <Text style={styles.instruction}>
      {status === "waiting"
        ? "Align your body to the outline. When ready, tap CAPTURE."
        : status === "capturing"
        ? "Please hold still..."
        : status === "analyzing"
        ? "Processing scans..."
        : "Waiting for camera..."}
    </Text>

    <View style={styles.scanBox}>
      <Text style={{ color: "#fff", fontSize: 18 }}>
        {loadingMsg || (status === "waiting" ? "Ready to capture" : status.toUpperCase())}
      </Text>

      {(status === "waiting" || status === "capturing") && (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 12 }} />
      )}
    </View>


    <View style={{ alignItems: "center", marginTop: 10 }}>
      <TouchableOpacity
        style={styles.captureBtn}
        onPress={handleCapturePhase}
        disabled={!cameraReady || status === "capturing" || !!loadingMsg}
      >
        <RNText style={{ fontSize: 20, fontWeight: "600", color: 'white'}}>
          {scanPhase === "front" ? "CAPTURE FRONT" : "CAPTURE SIDE"}
        </RNText>
      </TouchableOpacity>
    </View>
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
textAlign: "center",
},
instruction: {
color: "#fff",
marginBottom: 6,
textAlign: "center",
},
scanBox: {
alignItems: "center",
justifyContent: "center",
backgroundColor: "rgba(0,0,0,0.5)",
padding: 10,
borderRadius: 10,
marginBottom: 80,
},
captureBtn: {
backgroundColor: "#61C35C",
alignItems: 'center',
padding: "3%",
width: "65%",
borderRadius: 8,
bottom: 65
},
});

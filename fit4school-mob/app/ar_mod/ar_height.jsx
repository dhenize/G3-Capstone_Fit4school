//IMPORTS
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

//For AR Fitting
import * as tf from "@tensorflow/tfjs";
import { Camera } from "expo-camera";
import CamView from "../../components/ar_com/cam_view";

export default function ArStart() {
  const [text, setText] = useState("");

  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    async function prepare() {
      await tf.ready();
      console.log("✅ TensorFlow.js is ready!");

      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    }
    prepare();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Requesting for camera permission...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: "10%", justifyContent: "space-between" }}>
      <CamView hidden={false} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          top: "2%",
        }}
      >
        <Ionicons name="alert-circle-outline" size={24} color="white" />

        <TouchableOpacity onPress={() => router.push("/dash_mod/home")}>
          <Ionicons name="close-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.boxcont}>
        <View style={styles.box}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            Enter height and gender
          </Text>
          <Text styles={styles.infos}>
            To get a more accurate size suggestions, please fill up the
            information below. Gender is required but height is optional but
            highly encouraged.
          </Text>

          <View style={styles.height}>
            <Text style={styles.infos}>Height</Text>
            <TextInput
              style={{}}
              placeholder="Enter Height"
              onChangeText={(newText) => setText(newText)}
              value={text}
            />
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#61C35C",
            padding: "3%",
            width: "45%",

            borderRadius: 5,
            shadowColor: "black",
            elevation: 5,
            shadowOpacity: 0.3,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 4 },
            alignItems: "center",
            justifyContent: "center",
            bottom: 25,
          }}
          onPress={() => router.push("/ar_mod/ar_calc")}
        >
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxcont: {
    alignItems: "center",
    top: 200,
  },
  box: {
    padding: "5%",
    backgroundColor: "#BCF0B9",
    height: "55%",
    width: "99%",
    borderRadius: 5,

    justifyContent: "center",
  },

  infos: {
    size: 24,
    textAlign: "justify",
    fontSize: 15,
  },

  height: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

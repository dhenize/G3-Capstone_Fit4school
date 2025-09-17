import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { Ionicons } from "@expo/vector-icons";

export default function TfTest() {
  useEffect(() => {
    async function loadTF() {
      await tf.ready();
      console.log("✅ TensorFlow.js is ready!");

      const testTensor = tf.tensor([1, 2, 3, 4]);
      testTensor.print();
    }
    loadTF();
  }, []);

  return (
    <View style={{ flex: 1, padding: '10%', justifyContent: "space-between" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          top: '2%',
          opacity: 0.35
        }}
      >
        <Ionicons name="alert-circle-outline" size={24} color="black" />
        <Ionicons name="exit" size={24} color="black" />
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#D9D9D9",
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
            bottom: 25
          }}
          onPress={() => alert("Begin AR Scanner")}
        >
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

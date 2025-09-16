import React, { useEffect } from "react";
import { View, Text } from "react-native";
import * as tf from "@tensorflow/tfjs";

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 18 }}>TensorFlow.js Test Screen</Text>
    </View>
  );
}

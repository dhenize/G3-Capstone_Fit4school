import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "../../components/globalText";
import { Ionicons } from "@expo/vector-icons";


export default function settings() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFBFB" }}>

      <View style={styles.titlebox}>
        <TouchableOpacity>
            
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>
      </View>

      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //TITLE CONTAINER
  titlebox: {
    justifyContent: "flex-start",
    alignContent: "center",
    backgroundColor: "#0FAFFF",
    padding: "10%",
    height: "14%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  title: {
    fontWeight: "500",
    fontSize: 24,
    color: "white",
    justifyContent: "center",
  },

  container: {
    padding: "7%",
    flex: 1,
    backgroundColor: "#FFFBFB",
  },
});

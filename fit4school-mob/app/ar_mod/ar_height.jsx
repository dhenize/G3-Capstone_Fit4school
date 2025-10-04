// app/ar_mod/ar_height.jsx

//IMPORTS
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text } from "../../components/globalText";

//For AR Fitting
import * as tf from "@tensorflow/tfjs";
import { Camera } from "expo-camera";
{/* import CamView from "../../components/ar_com/cam_view"; */}
import { Picker } from "@react-native-picker/picker";
import HelpModal from "../../components/ar_com/help_modal";


export default function ArStart() {
  const [helpVisible, setHelpVisible] = useState(false);

  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("ft");
  const [gender, setGender] = useState(null);

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

  //Height Values
  const ftValues = [
    "3.0 ft",
    "3.5 ft",
    "4.0 ft",
    "4.2 ft",
    "4.3 ft",
    "4.5 ft",
    "4.8 ft",
    "5.0 ft",
    "5.2 ft",
    "5.3 ft",
    "5.5 ft",
    "5.8 ft",
    "5.10 ft",
    "6.0 ft",
  ];

  const cmValues = [
    "91 cm",
    "107 cm",
    "122 cm",
    "128 cm",
    "131 cm",
    "137 cm",
    "146 cm",
    "152 cm",
    "159 cm",
    "162 cm",
    "168 cm",
    "177 cm",
    "178 cm",
    "183 cm",
  ];

  return (
    <View style={{ flex: 1 }}>
      
      {/* <View style={StyleSheet.absoluteFillObject}>
        <CamView hidden={false} />
      </View> 
      */}
      
      <View
        style={{ flex: 1, padding: "8.5%", justifyContent: "space-between" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            top: "2%",
          }}
        >
          <TouchableOpacity onPress={() => setHelpVisible(true)}>
            <Ionicons name="alert-circle-outline" size={28} color="white" />
          </TouchableOpacity>
          
          <HelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />

          <TouchableOpacity onPress={() => router.push("/dash_mod/home")}>
            <Ionicons name="close-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.boxcont}>
          <View style={styles.box}>
            <Text style={{ fontSize: 18, fontWeight: 500 }}>
              Enter height and gender
            </Text>
            <Text style={styles.infos}>
              To get a more accurate size suggestions, please fill up the
              information below. Gender is required but height is optional but
              highly encouraged.
            </Text>


            {/* Height Picker */}
            <View style={{ paddingLeft: "4%", paddingRight: "4%" }}>
              <View style={styles.row}>
                
                <Text style={{ fontSize: 16, fontWeight: 500 }}>Height</Text>
                
                <View
                  style={{
                    width: "50%",
                    alignItems: "center",
                    borderBottomWidth: 2,
                    borderColor: "black",
                    paddingVertical: 0,
                    height: "79%",
                    bottom: 5,
                    marginLeft: "4%",
                  }}
                >
                  <Picker
                    selectedValue={height}
                    style={{
                      width: "100%",
                    }}
                    itemStyle={{
                      textAlign: "center",
                    }}
                    onValueChange={(val) => setHeight(val)}
                  >
                    {(unit === "ft" ? ftValues : cmValues).map((val) => (
                      <Picker.Item key={val} label={val} value={val} />
                    ))}
                  </Picker>
                </View>


                {/* FT / CM */}
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => setUnit("ft")}>
                    <Text
                      style={{
                        fontWeight: unit === "ft" ? "700" : "400",
                        color: unit === "ft" ? "#black" : "gray",
                        marginRight: 6,
                      }}
                    >
                      ft
                    </Text>
                  </TouchableOpacity>
                  <Text>|</Text>
                  <TouchableOpacity onPress={() => setUnit("cm")}>
                    <Text
                      style={{
                        fontWeight: unit === "cm" ? "700" : "400",
                        color: unit === "cm" ? "#black" : "gray",
                        marginLeft: 6,
                      }}
                    >
                      cm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Gender Selection */}
              <View style={{ justifyContent: "space-evenly", flexDirection: "row", marginVertical: "5%" }}>
                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => setGender("male")}
                >
                  <Ionicons
                    name={
                      gender === "male" ? "radio-button-on" : "radio-button-off"
                    }
                    size={20}
                    color={gender === "male" ? "#61C35C" : "black"}
                  />
                  <Text
                    style={{ fontSize: 16, fontWeight: 500, marginLeft: 6 }}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => setGender("female")}
                >
                  <Ionicons
                    name={
                      gender === "female"
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color={gender === "female" ? "#61C35C" : "black"}
                  />
                  <Text
                    style={{ fontSize: 16, fontWeight: 500, marginLeft: 6 }}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Enter Button */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.enterBtn}
            onPress={() => router.push({
              pathname: "/ar_mod/ar_calc",
              params: { height, unit, gender },
            })}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: 'white' }}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxcont: {
    alignItems: "center",
    top: 180,
  },
  box: {
    padding: "6%",
    backgroundColor: "#BCF0B9",
    height: "60%",
    width: "99%",
    borderRadius: 5,
    justifyContent: "center",
  },
  infos: {
    fontSize: 15,
    textAlign: "justify",
    marginTop: "3%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "7%",
  },
  enterBtn: {
    alignItems: "center",
    backgroundColor: "#61C35C",
    padding: "3%",
    width: "65%",
    borderRadius: 5,
    shadowColor: "black",
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
    justifyContent: "center",
    bottom: 65,
  },
});

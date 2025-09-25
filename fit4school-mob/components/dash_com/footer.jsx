import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { width } = Dimensions.get("window");
  const center = width / 2;
  const arcWidth = 110;
  const bulge = 38;
  const top = 50;
  const barHeight = top + 125;
  const leftX = center - arcWidth / 2;
  const rightX = center + arcWidth / 2;
  const c1x = center - arcWidth * 0.34;
  const c2x = center + arcWidth * 0.34;
  const peakY = top - bulge;

  const path = `
    M0 ${top}
    L ${leftX} ${top}
    Q ${c1x} ${peakY} ${center} ${peakY}
    Q ${c2x} ${peakY} ${rightX} ${top}
    L ${width} ${top}
    L ${width} ${barHeight}
    L 0 ${barHeight}
    Z
  `.replace(/\s+/g, " ");

  const tabs = [
    { name: "Home", icon: "home-outline", path: "/dash_mod/home" },
    { name: "Inbox", icon: "mail-outline", path: "/dash_mod/inbox" },
    { name: "Transaction", icon: "receipt-outline", path: "/dash_mod/transact" },
    { name: "Account", icon: "person-circle-outline", path: "/dash_mod/account" },
  ];

  const goToPage = (index, path) => {
    setActiveIndex(index);
    router.push(path);
  };

  return (
    <View style={[styles.container, { height: barHeight }]}>
      <Svg
        width={width}
        height={barHeight}
        viewBox={`0 0 ${width} ${barHeight}`}
        preserveAspectRatio="none"
        style={styles.svg}
      >
        {/* Shadow */}
        <Path d={path} fill="black" opacity={0.05} transform="translate(0, -4)" />
        <Path d={path} fill="black" opacity={0.04} transform="translate(0, -6)" />
        <Path d={path} fill="black" opacity={0.03} transform="translate(0, -8)" />
        <Path d={path} fill="black" opacity={0.02} transform="translate(0, -10)" />

        {/* Main BG */}
        <Path d={path} fill="#0FAFFF" />
      </Svg>

      {/* Tabs */}
      <View style={[styles.tabs, { width: width * 0.9, bottom: 52 }]}>
        {/* LEFT TAB */}
        <View style={styles.sideTabs}>
          {tabs.slice(0, 2).map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeIndex === index && styles.activeTab]}
              onPress={() => goToPage(index, tab.path)}
            >
              <Ionicons
                name={tab.icon}
                size={40}
                color="white"
                style={{
                  textShadowColor: "white",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1,
                }}
              />
              <Text style={styles.label}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RIGHT TAB*/}
        <View style={styles.sideTabs}>
          {tabs.slice(2).map((tab, i) => {
            const index = i + 2;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.tab, activeIndex === index && styles.activeTab]}
                onPress={() => goToPage(index, tab.path)}
              >
                <Ionicons
                  name={tab.icon}
                  size={40}
                  color="white"
                  style={{
                    textShadowColor: "white",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 1,
                  }}
                />
                <Text style={styles.label}>{tab.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* AR Button */}
      <View style={[styles.arButtonContainer, { bottom: 45 }]}>
        <TouchableOpacity
          style={[styles.arButton, { width: 73, height: 73, borderRadius: 78 / 2 }]}
          onPress={() => goToPage(0, "/ar_mod/ar_height")}
        >
          <Ionicons
            name="cube-outline"
            size={38}
            color="white"
            style={{
              textShadowColor: "white",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.arLabel}>AR Fitting</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 50,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    alignItems: "center",
  },
  sideTabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "38%",
  },
  tab: {
    alignItems: "center",
    paddingHorizontal: 1.5,
    paddingVertical: 3,
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    padding: 6,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  arButtonContainer: {
    position: "absolute",
    alignItems: "center",
  },
  arButton: {
    backgroundColor: "#6BD368",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  arLabel: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
});

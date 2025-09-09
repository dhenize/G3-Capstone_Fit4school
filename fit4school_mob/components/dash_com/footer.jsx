import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { name: "Home", icon: "home-outline", path: "../dash_mod/home" },
    { name: "Inbox", icon: "mail-outline", path: "../dash_mod/inbox" },
    { name: "Transaction", icon: "receipt-outline", path: "../dash_mod/transact" },
    { name: "Account", icon: "person-circle-outline", path: "../dash_mod/account" },
  ];

  const goToPage = (index, path) => {
    setActiveIndex(index);
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* Convex Background */}
      <Svg width="100%" height="100" style={styles.svg}>
        <Path
          d="M0 20 L130 20 Q200 -50 260 20 L400 20 L400 140 L0 140 Z"
          fill="#0FAFFF"
          scale={1}
        />
      </Svg>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.slice(0, 2).map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeIndex === index && styles.activeTab]}
            onPress={() => goToPage(index, tab.path)}
          >
            <Ionicons name={tab.icon} size={32} color="black" />
            <Text style={styles.label}>{tab.name}</Text>
          </TouchableOpacity>
        ))}

        {/* Gap for AR Button */}
        <View style={{ width: 80 }} />

        {tabs.slice(2).map((tab, index) => (
          <TouchableOpacity
            key={index + 2}
            style={[styles.tab, activeIndex === index + 2 && styles.activeTab]}
            onPress={() => goToPage(index + 2, tab.path)}
          >
            <Ionicons name={tab.icon} size={32} color="black" />
            <Text style={styles.label}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* AR Button */}
      <View style={styles.arButtonContainer}>
        <TouchableOpacity
          style={styles.arButton}
          onPress={() => goToPage(2, "/dash_mod/ar")} //must change
        >
          <Ionicons name="cube-outline" size={38} color="black" />
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
    height: 140,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  svg: {
    position: "absolute",
    top: 0,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    position: "absolute",
    bottom: 50,
  },
  tab: {
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 6,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  arButtonContainer: {
    position: "absolute",
    bottom: 45,
    alignItems: "center",
  },
  arButton: {
    width: 78,
    height: 78,
    backgroundColor: "#6BD368",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  arLabel: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 5,
  },
});

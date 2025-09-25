import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";

export default function help_modal({}) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent="true"
      onRequestClose={onClose}
    >
      <View style={styles.t_cont}>
        <Text style={styles.title}>How to use Virtual Size Assistant</Text>
      </View>

      <View style={styles.desc_cont}>
        <Text style={styles.desc}>
          Step 1 – Prepare Your Space Stand in a well-lit area with minimal
          shadows. Make sure your full body is visible on camera (from head to
          feet). Place your phone at least 2 meters (about 6 feet) away, ideally
          on a stable surface or tripod. 
          
          Step 2 – Enter your child’s height and
          gender Before scanning, type in your actual height (in centimeters or
          feet) and gender. This helps the camera scale body proportions more
          accurately for size calculation. You can leave height empty if you do
          not know exactly your child’s height, but gender is required. 
          
          Step 3 –
          Align the body Stand upright with arms slightly away from your body.
          Face forward toward the camera. Keep your feet shoulder-width apart.
          
          Step 4 – Start Scanning Tap “Start”. Slowly rotate 360° when prompted,
          or follow the on-screen guide (e.g., “Turn left,” “Turn right”). The
          app will capture key body points (shoulders, chest, waist, hips,
          legs). 
          
          Step 5 – Wait Once scanning is complete, the app will analyze
          your body dimensions. 
          
          Step 6 – View Recommended Size The app will
          display your recommended clothing size (e.g., Small, Medium, Large, or
          numeric size).
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    /* Insert codes here */
})

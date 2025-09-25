// components/ar_com/silhouette_overlay.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SilhouetteOverlay = ({ type = 'front', isActive = false }) => {

  const frontSilhouette = "M50,20 C60,10 90,10 100,20 C110,30 110,180 100,190 C90,200 60,200 50,190 C40,180 40,30 50,20 Z";
  const sideSilhouette = "M50,20 C60,15 90,15 95,20 C100,25 100,180 95,185 C90,190 60,190 55,185 C50,180 50,25 50,20 Z";

  return (
    <View style={[styles.container, isActive ? styles.active : styles.inactive]}>
      <Svg height="100%" width="100%" viewBox="0 0 150 200">
        <Path
          d={type === 'front' ? frontSilhouette : sideSilhouette}
          fill="none"
          stroke={isActive ? "#61C35C" : "rgba(255,255,255,0.5)"}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.3,
  }
});

export default SilhouetteOverlay;
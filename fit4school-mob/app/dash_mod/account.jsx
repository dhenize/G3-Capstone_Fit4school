//../../dash_mod/account
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Text } from "../../components/globalText";


export default function account(){
  return (
    <View style={styles.container}>
      <Text>Welcome to Account Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //OVERALL CONTAINER
  container:{
    padding: '8.5%',
    flex: 1,
    backgroundColor: '#FFFBFB',
  },
})
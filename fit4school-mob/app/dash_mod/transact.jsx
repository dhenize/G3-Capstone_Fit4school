//../../dash_mod/transact
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Text } from "../../components/globalText";


export default function transact(){
  return (
    <View style={styles.container}>
      <Text>Welcome to Transact Page</Text>
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
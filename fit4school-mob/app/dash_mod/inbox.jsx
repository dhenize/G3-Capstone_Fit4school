//../../dash_mod/inbox
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Text } from "../../components/globalText";


export default function inbox(){
  return (
    <View style={styles.container}>
      <Text>Welcome to Inbox Page</Text>
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
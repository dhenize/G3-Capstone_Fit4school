//../../dash_mod/account
import React from 'react';

import { StyleSheet, View, Image, Touchable, TouchableOpacity } from 'react-native';
import { Text } from "../../components/globalText";


export default function account(){
  return (
    <View style={styles.container}>
      
      <View style = {styles.prof_cont}>
        <View style = {styles.dp_cont}>
          <Image source={require("../../assets/images/dp_ex.jpg")} style = {styles.dp_pic} />
        </View>

        <View style = {styles.dp_txt}>
          <Text style = {{fontWeight: '500', color: '#0FAFFF', fontSize: 20}}>{"Juan Dela Cruz"}</Text>
          <Text style = {{fontWeight: '400', color: 'black', fontSize: 14}}>{"juandelacruz@email.com"}</Text>
          <Text style = {{fontWeight: '400', color: '#FF6767', fontSize: 14}}>{"User ID: 250042"}</Text>
          <Text style = {{fontWeight: '400', color: '#61C35C', fontSize: 14}}>{"Verified"}</Text>
        </View>
      </View>

      <View style = {styles.stng_cont}>
        <TouchableOpacity style = {styles.btns}>
          <Text style = {styles.stng_txt}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btns}>
          <Text style = {styles.stng_txt}>Account Recovery</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btns}>
          <Text style = {styles.stng_txt}>Help Center</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btns}>
          <Text style = {styles.stng_txt}>Privacy Notice</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btns}>
          <Text style = {styles.stng_txt}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.btns}>
          <Text style = {styles.stng_txt}>Contact Us</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style = {{paddingVertical: '20%'}}>
          <Text style = {styles.stng_txt}>Logout</Text>
        </TouchableOpacity>

      </View>

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

  prof_cont:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '10%',
    paddingBottom: '5%',
    gap: '5%',
  },

  dp_pic:{
    borderRadius: 100,
    height: 100,
    width: 100,
  },

  stng_cont:{
    padding: '4%'
  },

  btns:{
    paddingVertical: '3%'
  },

  stng_txt:{
    fontWeight: '400',
    fontSize: 15,
  },

})
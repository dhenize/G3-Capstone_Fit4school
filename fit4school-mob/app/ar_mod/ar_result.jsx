// app/ar_mod/ar_result.jsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ArResult(){
  const { size, chestCm, userHeightCm, gender } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{alignItems:'center', marginTop:40}}>
        <Image source={require("../../assets/images/g2_unif_ex.png")} style={{width:180, height:180}} resizeMode="contain" />
      </View>

      <Text style={styles.sizeLabel}>Your size is</Text>
      <Text style={styles.size}>{size || "Unknown"}</Text>
      <Text style={styles.sub}>{gender} | Height: {userHeightCm} cm</Text>

      <View style={{marginTop:30, alignItems:'center'}}>
        <Text>Estimated chest: {chestCm} cm</Text>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%', marginTop:40}}>
        <TouchableOpacity style={styles.btn} onPress={() => router.replace("/dash_mod/home")}>
          <Text>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {backgroundColor:'#61C35C'}]} onPress={() => alert('Buying')}>
          <Text>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, alignItems:'center'},
  sizeLabel:{marginTop:20, fontSize:16},
  size:{fontSize:36, color:'#2ecc71', fontWeight:'700', marginTop:8},
  sub:{color:'#666', marginTop:8},
  btn:{ padding:12, borderRadius:8, backgroundColor:'#e6e6e6' }
});

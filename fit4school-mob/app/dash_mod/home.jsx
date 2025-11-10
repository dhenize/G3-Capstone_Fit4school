//../../dash_mod/home

//IMPORTS
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Text } from "../../components/globalText";
import { useRouter } from "expo-router";


//MAIN FUNCTION
export default function Home() {
  
  const router = useRouter();
  const [sort, setSort] = useState("all");
  
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greet}>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>Hello</Text>
          <Text style={{ color: '#0FAFFF', fontSize: 20, fontWeight: '500' }}>Juan Dela Cruz {"!"}</Text>
        </View>
        
        <View style={styles.helpbtn}>
          <TouchableOpacity style = {styles.button} onPress={() => alert("Help button pressed")}>
            <Text style={{ fontSize: 13, fontWeight: '400' }}>HELP</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/*CURRENT PROCESSING ORDER*/}
      
        <View style={styles.cpo_cont}>
          <View style={styles.cpo_pic}>
            <Image 
            source={require("../../assets/images/g2_unif_ex.png")}
            style={{height: 70, width: 70, borderRadius: 10}}
            />
          </View>

          <View style = {styles.cpo_desc}>
            <Text style={{ color: '#0FAFFF', fontSize: 14, fontWeight: '600', textAlign: "left" }}>Your Order is being processed!</Text>
            <Text style={{ color: '#0FAFFF', fontSize: 12, fontWeight: '400', textAlign: "left" }}>#04 Boy’s Uniform (Pre-school)</Text>
            <Text style={{ color: '#0FAFFF', fontSize: 11, fontWeight: '400', textAlign: "left" }}>size 8</Text>
            <Text style={{ color: '#61C35C', fontSize: 13, fontWeight: '500', textAlign: "left" }}>Quantity: 2</Text>
          </View>
        </View>

        <Text style = {{ marginTop: '5%', marginBottom: '3%', fontSize: 16, fontWeight: '500', textAlign: "left "}}>Order Again?</Text>


        <TouchableOpacity>
          <View style={styles.oa_cont}>

            <View style = {styles.oa_pic}>
              <Image 
              source={require("../../assets/images/g2_unif_ex.png")}
              style={{height: 50, width: 50, borderRadius: 10, borderColor: '#0FAFFF', borderWidth: 2}}
              />
            </View>

            <View style = {styles.oa_desc}>
              <Text style={{ fontSize: 13, fontWeight: '400', textAlign: "left" }}>#03 Girl’s Uniform (Pre-school)</Text>
              <Text style={{ fontSize: 11, fontWeight: '400', textAlign: "left" }}>size 10</Text>
            </View>

          </View>          
        </TouchableOpacity>


        <View style = {styles.sort_cont}>
          <View>
              <Text style={{ fontSize: 13, fontWeight: '500', textAlign: "left" }}>{"10 Items"}</Text>            
          </View>

          <View style = {styles.drop_cont}>
            <Picker selectedValue={sort} style={styles.dropdown} onValueChange={(itemValue) => setSort(itemValue)}>
              <Picker.Item label="All Items" value="all" style = {styles.drop_txt}/>
              <Picker.Item label="Pre-School" value="pschl" style = {styles.drop_txt}/>
              <Picker.Item label="Elementary" value="elem" style = {styles.drop_txt}/>
              <Picker.Item label="Junior High" value="jhs" style = {styles.drop_txt}/>
              <Picker.Item label="Full-Set" value="full" style = {styles.drop_txt}/>
              <Picker.Item label="PE" value="peduc" style = {styles.drop_txt}/>
              <Picker.Item label="Girls" value="grl" style = {styles.drop_txt}/>
              <Picker.Item label="Boys" value="bys" style = {styles.drop_txt}/>
            </Picker>
          </View>
        </View>

        <ScrollView style={{ flex: 1, marginTop: "7%" }} contentContainerStyle={{ paddingBottom: '5%' }}>
          <View style = {styles.unif_cont}>
            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/b_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Boy's Uniform</Text>
                <Text style = {styles.unif_desc}>(Preschool)</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/g_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Girl's Uniform</Text>
                <Text style = {styles.unif_desc}>(Preschool)</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/b_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Boy's Uniform</Text>
                <Text style = {styles.unif_desc}>(Elementary)</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/g_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Girl's Uniform</Text>
                <Text style = {styles.unif_desc}>(Elementary)</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/b_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Boy's Uniform</Text>
                <Text style = {styles.unif_desc}>(Junior High)</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/g_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Girl's Uniform</Text>
                <Text style = {styles.unif_desc}>(Junior High)</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/pe_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Pre-School PE</Text>
                <Text style = {styles.unif_desc}>Uniform</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/pe_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Primary PE</Text>
                <Text style = {styles.unif_desc}>Uniform</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/pe_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Junior High</Text>
                <Text style = {styles.unif_desc}>PE Uniform</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push("/transact_mod/uniforms")}>
              <View style = {styles.unif_grid}>
                <Image source={require("../../assets/images/pe_unif_ex.png")} style={styles.unif_pics}/>
                <Text style = {styles.unif_desc}>Other Item</Text>
                <Text style = {styles.unif_prc}>₱400.00</Text>              
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>

    </View>
  );
} //END OF MAIN FUNCTION


//STYLES
const styles = StyleSheet.create({
  //OVERALL CONTAINER
  container:{
    padding: '8.5%',
    flex: 1,
    backgroundColor: '#FFFBFB',
  },
  
  //HEADER 
  header: { 
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: 'center',
    marginTop: '5%',
  },

  button: {
    backgroundColor: "#FFFF20",
    width: 60,
    height: 25,
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 5,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 0.90,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
  },


  // CURRENT PROCESSING ORDER CONTATINER
  cpo_cont:{
    marginTop: '6%',
    padding: '3%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    height: 90,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '5%',
  },

  cpo_desc:{
    alignContent: 'center',
  },

  // ORDER AGAIN CONTATINER
  oa_cont:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8%',
    marginBottom: '7%',
  },

  // SORT AND DROPDOWN CONTATINER
  sort_cont:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  drop_cont:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    width: 145,
  },

  dropdown:{
    height: 51,
    width: 145,
    marginTop: -6,
  },

  drop_txt:{
    fontSize: 13,
    fontWeight: '600',
  },

  // UNIFORMS CONTATINER
  unif_pics:{
    height: 140,
    width: 140,
    marginBottom: '5%',
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },

  unif_cont:{
    flexDirection: "row",
    alignContent: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    
  },
  
  unif_grid:{
    alignItems: 'center',
    marginVertical: '6%',
  },

  unif_desc:{
    fontSize: 15,
    fontWeight: '400',
  },

  unif_prc:{
    color: '#61C35C',
    fontWeight: '600',
  },

}); //END OF STYLES

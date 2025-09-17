//IMPORTS
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-svg";



//MAIN FUNCTION
export default function Home() {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greet}>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>Hello</Text>
          <Text style={{ color: '#0FAFFF', fontSize: 20, fontWeight: '500' }}>Juan Dela Cruz</Text>
        </View>
        
        <View style={styles.helpbtn}>
          <TouchableOpacity style = {styles.button} onPress={() => alert("Help button pressed")}>
            <Text style={{ fontSize: 14, fontWeight: '400' }}>HELP</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/*CURRENT PROCESSING ORDER*/}
      <View style={styles.cpo_cont}>
        <View style={styles.cpo_pic}>
          {/* <Image source={require("../")}/> */}
        </View>
      </View>
      
    </View>
  );
} //END OF MAIN FUNCTION


//STYLES
const styles = StyleSheet.create({
  //OVERALL CONTAINER
  container:{
    padding: '10%',
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


  //CURRENT PROCESSING ORDER CONTATINER
  cpo_cont:{

  },

}); //END OF STYLES

//../../dash_mod/transact
import React, {useState} from 'react';

import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text } from "../../components/globalText";


export default function transact(){

  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <View style = {{flex: 1, backgroundColor: '#FFFBFB'}}>

      <View style = {styles.titlebox}>
        <Text style = {styles.title}>Transaction</Text>
      </View>
      
      <View style={styles.tabs_cont}>

        <View style = {styles.srbtn_cont}>
          <TouchableOpacity onPress={() => setActiveTab("appointments")}>
            <View style = {[styles.sysbtn, activeTab === "appointments" && styles.activeBtn]}>
              <Text style = {[styles.sysbtn_txt, activeTab === "appointments" && styles.activeBtnText]}>Appointments</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("mycart")}>
            <View style = {[styles.rembtn, activeTab === "mycart" && styles.activeBtn]}>
              <Text style = {[styles.rembtn_txt, activeTab === "mycart" && styles.activeBtnText]}>My Cart</Text>
            </View>
          </TouchableOpacity>
        </View>

        
          <ScrollView style={{ flex: 1, marginTop: '10%'}} contentContainerStyle={{ paddingBottom: '%' }}>
           
            {activeTab === "appointments" ? (

              <View style = {styles.notif_cont}>
                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/success.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your account has been verified!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your account " + "Juan Dela Cruz"}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>was successfully verified.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/success.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your account has been verified!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your account " + "Juan Dela Cruz"}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>was successfully verified.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/success.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your account has been verified!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your account " + "Juan Dela Cruz"}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>was successfully verified.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/success.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your account has been verified!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your account " + "Juan Dela Cruz"}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>was successfully verified.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/success.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your account has been verified!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your account " + "Juan Dela Cruz"}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>was successfully verified.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>
              
              </View>

            ) : (

              <View style = {styles.notif_cont}>
                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/notif.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your ticket will expire soon!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your booking " + "#1234 " + "will expire within"}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>24 hours if left unpaid.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/notif.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your order has arrived!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your booking " + "#451 " + "is ready for pick up."}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>Please set your schedule to claim it.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/notif.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your order is now in production.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>The Item you ordered is now in</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>production. Production #245.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/notif.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>We recieved your payment!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>Thank you customer! Your payment</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>has been validated.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>


                <View style = {styles.notif}>
                  <View>
                    <Image source = {require("../../assets/images/icons/gen_icons/notif.png")} style = {styles.notif_img}/>
                  </View>
                  <View>
                    <Text style = {{color: '#1F72AD', fontSize: 14, fontWeight: '600'}}>Your order has arrived!</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>{"Your booking " + "#451 " + "is ready for pick up."}</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 12, fontWeight: '400'}}>Please set your schedule to claim it.</Text>
                    <Text style = {{color: '#1F72AD', fontSize: 11, fontWeight: '400', alignSelf: 'flex-end', marginVertical: '2%'}}>Aug. 3, 2025</Text>
                  </View>
                </View>

              
              </View>
            )}
            
          </ScrollView>
        
        <TouchableOpacity>
          <View style = {styles.hisbtn}>
            <Image source={require("../../assets/images/icons/gen_icons/history.png")} style = {styles.his_pic}/>
          </View>
        </TouchableOpacity>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  //TITLE CONTAINER
  titlebox:{
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: '#61C35C',
    padding: '10%',
    height: '16%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  title:{
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
    justifyContent: 'center',
  },

  //OVERALL CONTAINER
  tabs_cont:{
    padding: '7%',
    flex: 1,
    backgroundColor: '#FFFBFB',
  },

  srbtn_cont:{
    flexDirection: "row",
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  sysbtn:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    height: 35,
    width: 155,
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },

  rembtn:{
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#D9D9D9',
    height: 35,
    width: 155,
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },

  sysbtn_txt:{
    fontWeight: '600',
  },

  rembtn_txt:{
    fontWeight: '600',
  },

  activeBtn:{
    backgroundColor: '#0FAFFF',
  },
  
  activeBtnText:{
    color: 'white',
  },

  notif:{
    marginVertical: '2.5%',
    height: 110,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  notif_img:{
    height: 70,
    width: 70,
  },

  hisbtn:{
    position: 'absolute',
    height: 65,
    width: 65,
    backgroundColor: '#61C35C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    bottom: '20%'
    
  },

  his_pic:{
    height: 40,
    width: 40,
  }
})
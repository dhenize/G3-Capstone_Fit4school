//../../dash_mod/inbox
import React from 'react';

import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Text } from "../../components/globalText";


export default function inbox(){
  return (
    <View style = {{flex: 1, backgroundColor: '#FFFBFB'}}>
      <View style = {styles.titlebox}>
        <Text style = {styles.title}>Inbox</Text>
      </View>

      <View style={styles.container}>
        <View style = {styles.srbtn_cont}>
            <TouchableOpacity>
              <View style = {styles.sysbtn_cont}>
                <Text style = {{fontWeight: '600', color: 'white'}}>System</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style = {styles.rembtn_cont}>
                <Text style = {{fontWeight: '600'}}>Reminder</Text>
              </View>
            </TouchableOpacity>
        </View>

        
          <ScrollView style={{ flex: 1, paddingVertical: '5%'}}>
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
          </ScrollView>
        

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
  container:{
    padding: '7%',
    flex: 1,
    backgroundColor: '#FFFBFB',
  },

  srbtn_cont:{
    flexDirection: "row",
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  sysbtn_cont:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0FAFFF',
    height: 35,
    width: 155,
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },

  rembtn_cont:{
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
  notif_cont:{
    paddingVertical: '5%',
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
    height: 75,
    width: 75,
  }
})